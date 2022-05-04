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
  getUsers(size: number = 10): Observable<ResponseInterface> {
    return this.http.get<any>(`${this.apiUrl}/?results=${size}`).pipe(
      map((response: ResponseInterface) => ({
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
              address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
              dateOfBirth: user.dob.date,
              phone: user.phone,
              imageUrl: user.picture.medium,
              coordinate: {
                latitude: +user.location.coordinates.latitude,
                logitude: +user.location.coordinates.longitude,
              },
            }
        ),
      }))
    );
  }

  // fetch one user using the user UUID
  getUser(uuid: number = 1): Observable<ResponseInterface> {
    return this.http.get<any>(`${this.apiUrl}/?uuid=${uuid}`).pipe(
      map((response: ResponseInterface) => ({
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
              address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
              dateOfBirth: user.dob.date,
              phone: user.phone,
              imageUrl: user.picture.medium,
              coordinate: {
                latitude: +user.location.coordinates.latitude,
                logitude: +user.location.coordinates.longitude,
              },
            }
        ),
      }))
    );
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
            address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
            dateOfBirth: user.dot.date,
            phone: user.phone,
            imageUrl: user.picture.medium,
            coordinate: {
              latitude: +user.location.coordinates.latitude,
              logitude: +user.location.coordinates.longitude,
            },
          }
      ),
    };
  }
}
