import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import {FormatDatePipe} from "../../shared/pipes/format-date.pipe";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [FormatDatePipe],
})
export class ArticleComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private formatDatePipe: FormatDatePipe,
    private route: ActivatedRoute
  ) {
  }

  article: any = {
    title: '',
    content: '',
    topic: '',
    image: '',
    claps: 0,
    readTime: 0,
    createdAt: '',
    authorName: '',
    authorImage: '',
    authorSlug: '',
  };

  ngOnInit() {
    let slug = '';

  this.route.url.subscribe((data) => {
    [ ,slug] = data.map((x) => x.path);
  });

    this.http.get(`/api/articles/article-details?slug=${slug}`).subscribe({
      next: (data) => {
        this.article = data;
        console.log('article>>', this.article);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed:', this.article);
      },
    });
  }
}
