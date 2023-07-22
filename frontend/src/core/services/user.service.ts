import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/shared/interfaces';

@Injectable()
export class UserService {
  user : IUser | null | undefined = null;

  constructor(private http: HttpClient) {}


}
