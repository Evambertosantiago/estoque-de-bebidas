import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  register(data: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/auth/users/`, data);
  }

  login(data: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/auth/jwt/create/`, data);
  }
  
}
