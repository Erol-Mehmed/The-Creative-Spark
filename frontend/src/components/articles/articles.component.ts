import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Author from '../../shared/interfaces/author';
import { FormatDatePipe } from "../../shared/pipes/format-date.pipe";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [FormatDatePipe],
})
export class ArticlesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private formatDatePipe: FormatDatePipe,
    private route: ActivatedRoute
  ) {}

  @Input() authorArticles: boolean = false;
  @Output() author = new EventEmitter<Author>();

  currentArticles: any = [];
  displayedArticles: any = [];
  articlesToShow: number = 10;

  transformCurrentArticles() {
    console.log('articles:', this.currentArticles);

    if (this.authorArticles) {
      this.author.emit({
        name: this.currentArticles[0].authorName,
        description: this.currentArticles[0].authorDescription,
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

  getArticles() {
    const currentSection = this.authorArticles
      ? `/author/?author=${this.route.snapshot.params['slug']}`
      : '/?section=all-articles';

    this.http.get(`/api${currentSection}`).subscribe({
      next: (data) => {
        this.currentArticles = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.transformCurrentArticles();
      },
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }
}
