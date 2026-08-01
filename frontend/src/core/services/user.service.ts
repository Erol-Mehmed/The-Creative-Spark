import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/shared/interfaces';

@Injectable()
export class UserService  {
  user : User | null | undefined = null;

  constructor(private http: HttpClient) {}

  register$(data: {
    username: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>(`${'http://localhost:5000'}/api/auth/register`, data);
  }
}
