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

  currentData: any;
  displayedArticles: any = [];
  articlesToShow: number = 10;

  processAndDisplayArticles() {
    if (this.authorArticles) {
      const author = this.currentData.author;

      this.author.emit({
        name: author.name,
        description: author.description,
        image: author.image,
      });

      this.currentData = this.currentData.articles;
    }

    this.displayedArticles = this.currentData.slice(0, 10);
  }

  loadMoreArticles() {
    if (this.currentData) {
      this.displayedArticles = this.currentData.slice(
        0,
        (this.articlesToShow += 10)
      );
    }
  }

  getArticles() {
    const currentEndpoint = this.authorArticles
      ? `/author?slug=${this.route.snapshot.params['slug']}`
      : '/articles?section=all-articles';

    this.http.get(`/api${currentEndpoint}`).subscribe({
      next: (data) => {
        this.currentData = data;

        console.log('current data:', this.currentData);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.processAndDisplayArticles();
      },
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }
}
