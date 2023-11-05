import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-most-liked-articles',
  templateUrl: './most-liked-articles.component.html',
  styleUrls: ['./most-liked-articles.component.scss'],
})
export class MostLikedArticlesComponent implements OnInit {
  constructor(private http: HttpClient) {};

  mostLikedArticles: any = [];

  ngOnInit(): void {
    this.http.get('/api?section=most-liked-articles').subscribe({
      next: (data) => {
        this.mostLikedArticles = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('complete');
        console.log(this.mostLikedArticles);
      },
    });
  }
}
