import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-most-liked-articles',
  templateUrl: './most-liked-articles.component.html',
  styleUrls: ['./most-liked-articles.component.scss'],
  providers: [DatePipe],
})
export class MostLikedArticlesComponent implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  mostLikedArticles: any = [];

  ngOnInit(): void {
    this.http.get('/api/api/v1/?section=most-liked-articles').subscribe({
      next: (data) => {
        this.mostLikedArticles = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        for (let i = 0; i < this.mostLikedArticles.length; i += 1) {
          this.mostLikedArticles[i].article.created_at =
            this.datePipe.transform(
              this.mostLikedArticles[i].article.created_at,
              'MMM dd, yyyy'
            );
        }
      },
    });
  }
}
