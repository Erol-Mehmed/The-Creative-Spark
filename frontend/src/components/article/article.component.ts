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
    const username = this.route;
    const slug = this.route.snapshot.paramMap.get('slug');

    console.log(username, slug);

    this.http.get(`/api/${username}/${slug}`).subscribe({
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
