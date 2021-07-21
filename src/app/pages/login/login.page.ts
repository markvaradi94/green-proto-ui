import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Account } from '../../dto/account.dto';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private ACCOUNT_STORAGE = 'account';
  account: Account;

  constructor(private apiService: ApiService,
              private storage: Storage,
              private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.storage.create();
  }

  doLogin(form: NgForm) {
    let params = new HttpParams();
    params = params.append('email', form.value.email);
    params = params.append('password', form.value.password);

    this.apiService.getAccountForLogin(params).subscribe(result => {
        if (result && result.length === 1) {
          this.account = result[0];
          console.log(this.account);
          this.storage.set(this.ACCOUNT_STORAGE, JSON.stringify(this.account));
          this.accountService.accountSubj.next(this.account);

          this.router.navigateByUrl('/home');
        }
      }, error => throwError(error)
    );
  }
}
