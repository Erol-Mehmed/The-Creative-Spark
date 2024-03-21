import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../../shared/interfaces/authorArticle';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [DatePipe],
})
export class ArticlesComponent implements OnInit, OnChanges {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  @Input() authorArticles: boolean = false;
  @Output() author = new EventEmitter<Author>();

  currentArticles: any = [];
  displayedArticles: any = [];
  articlesToShow: number = 10;

  transformDateTimeSetDisplayedArticles() {
    for (let i = 0; i < this.currentArticles.length; i += 1) {
      this.currentArticles[i].article.created_at = this.datePipe.transform(
        this.currentArticles[i].article.created_at,
        'MMM dd, yyyy'
      );
    }

    if (this.authorArticles) {
      this.author.emit({
        name: this.currentArticles[0].author.name,
        description: this.currentArticles[0].author.description,
      });
    }

    this.displayedArticles = this.currentArticles.slice(0, 10);
  }

  loadMoreArticles() {
    this.displayedArticles = this.currentArticles.slice(
      0,
      (this.articlesToShow += 10)
    );
  }

  getSetArticles() {
    if (this.currentArticles.length === 0) {
      const currentSection = this.authorArticles
        ? `/${this.route.snapshot.params['slug']}`
        : '/api/v1/?section=all-articles';

      this.http.get(`/api${currentSection}`).subscribe({
        next: (data) => {
          this.currentArticles = data;
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
    this.getSetArticles();
  }
}
