import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseInterface } from '../interfaces/response-interface';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly apiUrl: string = 'https://randomuser.me/api';

  constructor(private http: HttpClient) {}

  // fetch users
  getUsers(size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?results=${size}`);
  }

  // fetch one user using the user UUID
  getUser(uuid: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?uuid=${uuid}`);
  }

  private processResponse(response: ResponseInterface): ResponseInterface {
    return {
      info: {
        ...response.info,
      },
      results: response.results.map((user: any) => (<UserInterface>{})),
    };
  }
}
