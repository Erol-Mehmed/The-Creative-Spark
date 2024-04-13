import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormatDatePipe} from "../../shared/pipes/format-date.pipe";

@Component({
  selector: 'app-most-liked-articles',
  templateUrl: './most-liked-articles.component.html',
  styleUrls: ['./most-liked-articles.component.scss'],
  providers: [FormatDatePipe],
})
export class MostLikedArticlesComponent implements OnInit {
  constructor(private http: HttpClient, private formatDatePipe: FormatDatePipe) {}

  mostLikedArticles: any = [];

  ngOnInit(): void {
    this.http.get('/api/?section=most-liked-articles').subscribe({
      next: (data) => {
        this.mostLikedArticles = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('most liked articles:', this.mostLikedArticles);
      },
    });
  }
}
