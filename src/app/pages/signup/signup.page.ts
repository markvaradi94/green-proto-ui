import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Account } from '../../dto/account.dto';
import { AccountType } from '../../dto/enums/account-type';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private ACCOUNT_STORAGE = 'account';
  account: Account = new Account();

  constructor(private apiService: ApiService,
              private storage: Storage,
              private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.storage.create();
  }

  doSignup() {
    this.account.type = AccountType.CLIENT
    console.log(this.account);
    this.apiService.addNewAccount(this.account).subscribe(result => {
      console.log('inside add new account subscription: ');
      console.log(result);

      this.account = result as Account;
      console.log(this.account);

      this.storage.set(this.ACCOUNT_STORAGE, JSON.stringify(this.account));
      this.accountService.accountSubj.next(this.account);

      this.router.navigateByUrl('/home');

    });

    this.apiService.getAllAccounts().subscribe(accounts => {
      console.log(accounts);
    })
  }
}
