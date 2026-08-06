import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadArticleImage(file: File): Observable<{ image_url: string }> {
    const form = new FormData();
    form.append('image', file);

    return this.http.post<{ image_url: string }>(`/api/uploads/articles`, form);
  }

  uploadUserImage(file: File): Observable<{ image_url: string }> {
    const form = new FormData();
    form.append('image', file);

    return this.http.post<{ image_url: string }>(`/api/uploads/users`, form);
  }
}
