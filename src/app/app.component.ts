import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  email: string;

  public appPages = [
    {title: 'Home', url: '/home', icon: 'storefront-outline'},
    {title: 'Profile', url: '/folder/Profile', icon: 'person-outline'},
    {title: 'Favorites', url: '/folder/Favorites', icon: 'heart-outline'},
    {title: 'Contact', url: '/folder/Contact', icon: 'call-outline'},
    {title: 'About us', url: '/folder/About', icon: 'information-circle-outline'},
    {title: 'Logout', url: '/welcome', icon: 'log-out-outline'},
  ];

  constructor(private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.accountObservable().subscribe(account => {
      this.email = account.email;
    });

    console.log(this.email);
  }

}
