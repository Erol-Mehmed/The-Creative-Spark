import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Article } from "../../shared/interfaces/authorArticle";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [DatePipe],
})
export class ArticleComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {
  }

  // @ts-ignore
  article: Article;

  ngOnInit() {
    let authorSlug = '';
    let articleSlug = '';

  this.route.url.subscribe((data) => {
    [authorSlug, articleSlug] = data.map((x) => x.path);
  });

    this.http.get(`/api/article-details/?authorSlug=${authorSlug}&articleSlug=${articleSlug}`).subscribe({
      next: (data) => {
        // @ts-ignore
        this.article = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete:', this.article);
      },
    });
  }
}
