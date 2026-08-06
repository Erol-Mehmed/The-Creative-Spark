import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import {FormatDatePipe} from "../../shared/pipes/format-date.pipe";
import { UserService } from 'src/core/services/user.service';

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
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
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

  currentUser: any = null;

  ngOnInit() {
    this.userService.me$()?.subscribe({
      next: (user) => this.currentUser = user,
      error: () => (this.currentUser = null),
    });

    const article_slug = this.route.snapshot.params['article_slug'];

    this.http.get(`/api/articles/${article_slug}`).subscribe({
      next: (data) => {
        this.article = data;
      },
      error: (err) => {
        // error state handled by component
      },
      complete: () => {
        // loading complete
      },
    });
  }

  isOwner(): boolean {
    return this.currentUser && this.article.author_id === this.currentUser.id;
  }

  editArticle() {
    this.router.navigate(['/edit', this.article.slug]);
  }
}
