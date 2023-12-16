import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [DatePipe],
})
export class ArticlesComponent implements OnInit {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  allArticles: any = [];
  displayedArticles: any = [];
  articlesToShow: number = 10;

  loadMoreArticles() {
    this.displayedArticles = this.allArticles.slice(
      0,
      (this.articlesToShow += 10)
    );
  }

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

        this.displayedArticles = this.allArticles.slice(0, 10);
        console.log('all articles:', this.allArticles);
        console.log('displayed articles:', this.displayedArticles);
      },
    });
  }
}
