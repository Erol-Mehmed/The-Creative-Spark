import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [DatePipe],
})
export class ArticlesComponent implements OnInit, OnChanges {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  @Input() authorArticles: boolean = false;
  allArticles: any = [];
  displayedArticles: any = [];
  articlesToShow: number = 10;

  transformDateTimeSetDisplayedArticles() {
    for (let i = 0; i < this.allArticles.length; i += 1) {
      this.allArticles[i].article.created_at = this.datePipe.transform(
        this.allArticles[i].article.created_at,
        'MMMM dd'
      );
    }

    this.displayedArticles = this.allArticles.slice(0, 10);
  }

  loadMoreArticles() {
    this.displayedArticles = this.allArticles.slice(
      0,
      (this.articlesToShow += 10)
    );
  }

  getSetArticles() {

    if (this.allArticles.length === 0) {
      this.http.get('/api?section=all-articles').subscribe({
        next: (data) => {
          this.allArticles = data;
          console.log('all articles:', this.allArticles);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.transformDateTimeSetDisplayedArticles();
        },
      });
    } else {
      this.transformDateTimeSetDisplayedArticles();
    }
  }

  ngOnInit(): void {
    this.getSetArticles();
  }
  
  ngOnChanges(): void {
    console.log('author data:', this.authorArticles);

    this.getSetArticles();
  }
}
