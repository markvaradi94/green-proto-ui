import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account } from '../dto/account.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  getAllAccounts(): Observable<any> {
    return this.http.get(`${environment.api}/accounts`);
  }

  getAccountForLogin(params: HttpParams): Observable<any> {
    return this.http.get(`${environment.api}/accounts`, { params });
  }

  addNewAccount(account: Account): Observable<any> {
    return this.http.post(`${environment.api}/accounts`, account);
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${environment.api}/clients`);
  }

  getAllProviders(): Observable<any> {
    return this.http.get(`${environment.api}/providers`);
  }

  getAllGuests(): Observable<any> {
    return this.http.get(`${environment.api}/guests`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(`${environment.api}/orders`);
  }
}
