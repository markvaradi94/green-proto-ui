import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from '../dto/account.dto';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public accountSubj = new Subject<Account>();

  constructor() { }

  accountObservable(): Observable<Account> {
    return this.accountSubj.asObservable();
  }
}
