import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/shared/interfaces';

@Injectable()
export class UserService  {
  user : IUser | null | undefined = null;

  constructor(private http: HttpClient) {}

  register$(data: {
    username: string;
    email: string;
    password: string;
  }): Observable<IUser> {
    return this.http.post<IUser>(`${'http://localhost:3000'}/api/register`, data);
  }
}
