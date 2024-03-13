import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {ActivatedRoute} from "@angular/router";

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
  ) {}

  ngOnInit() {
    let authorSlug: string = '';
    let articleSlug: string = '';

    this.route.url.subscribe((data) => {
      [authorSlug, articleSlug] = data.map((x) => x.path);
    });

    this.http.get(`/api/${authorSlug}/${articleSlug}`).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
      },
    });
  }
}
