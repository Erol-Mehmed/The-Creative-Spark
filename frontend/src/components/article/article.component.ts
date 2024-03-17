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

  article: Article = {
      title: 'How to build Angular apps',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      topic: 'technology',
      image: 'https://via.placeholder.com/150',
      claps: 14,
      readTime: 5,
      created_at: 'Mar 16, 2024',
      author: {
        name: 'Erol Mehmed',
        image: 'https://via.placeholder.com/150',
        slug: 'erol-mehmed',
      },
    }

  ngOnInit() {
  const slugs = {
    authorSlug: '',
    articleSlug: '',
  };

  this.route.url.subscribe((data) => {
    [slugs.authorSlug, slugs.articleSlug] = data.map((x) => x.path);
  });

    this.http.get(`/api/article-details?article=${slugs}`).subscribe({
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
