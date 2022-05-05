import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    return this.http
      .get<any>(`${this.apiUrl}/?results=${size}`)
      .pipe(map((response) => this.processResponse(response)));
  }

  // fetch one user using the user UUID
  getUser(uuid: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/?uuid=${uuid}`)
      .pipe(map((response) => this.processResponse(response)));
  }

  private processResponse(response: ResponseInterface): ResponseInterface {
    return {
      info: {
        ...response.info,
      },
      results: response.results.map(
        (user: any) =>
          <UserInterface>{
            uuid: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            username: user.login.username,
            gender: user.gender,
            address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}, ${user.location.postcode}`,
            dateOfBirth: user.dob.date,
            phone: user.phone,
            imageUrl: user.picture.medium,
            coordinate: {
              latitude: +user.location.coordinates.latitude,
              longitude: +user.location.coordinates.longitude,
            },
          }
      ),
    };
  }
}
