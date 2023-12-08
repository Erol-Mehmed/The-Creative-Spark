import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
  providers: [DatePipe],
})
export class AllArticlesComponent implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  allArticles: any = [];

  loadMoreArticles() {};

  ngOnInit(): void {
    this.http.get('/api?section=all-articles').subscribe({
      next: (data) => {
        this.allArticles = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        for (let i = 0; i < this.allArticles.length; i += 1) {
          this.allArticles[i].article.created_at = this.datePipe.transform(
            this.allArticles[i].article.created_at,
            'MMMM dd'
          );
        }

        console.log('all articles:', this.allArticles);
      },
    });
  }
}
