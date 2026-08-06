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
    return this.http.post<User>(`/api/auth/register`, data);
  }

  login$(data: { email: string; password: string; }) {
    return this.http.post<{ access_token: string }>(`/api/auth/login`, data);
  }

  uploadProfileImage(file: File): Observable<{ image_url: string }> {
    const form = new FormData();
    form.append('image', file);

    return this.http.post<{ image_url: string }>(`/api/uploads/users`, form);
  }

  updateProfile(data: { first_name?: string; last_name?: string; bio?: string; image_url?: string; }) : Observable<User> {
    return this.http.patch<User>(`/api/auth/me`, data);
  }

  me$(): Observable<User> {
    return this.http.get<User>(`/api/auth/me`);
  }
}
