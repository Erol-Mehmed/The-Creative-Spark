import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  authorData: any = {};

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];

    this.http.get(`/api/${slug}`).subscribe({
      next: (data) => {
        this.authorData = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('author data:', this.authorData);
      },
    });
  }
}
