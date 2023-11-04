import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-most-clapped-articles',
  templateUrl: './most-clapped-articles.component.html',
  styleUrls: ['./most-clapped-articles.component.scss'],
})

export class MostClappedArticlesComponent implements OnInit {
  constructor (private http: HttpClient) {}

  most_clapped_articles: any = [];

  ngOnInit(): void {
   this.http.get('/api').subscribe(data => {
      this.most_clapped_articles = data
      console.log(this.most_clapped_articles);
    });
  }
}
