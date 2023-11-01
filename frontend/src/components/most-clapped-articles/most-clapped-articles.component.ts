import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-most-clapped-articles',
  templateUrl: './most-clapped-articles.component.html',
  styleUrls: ['./most-clapped-articles.component.scss'],
})

export class MostClappedArticlesComponent implements OnInit {
  constructor (private http: HttpClient) {}

  mostClappedArticles: any;

  ngOnInit(): void {
    this.mostClappedArticles = this.http.get('/api').subscribe(test => { 
      console.log('test:', test);
    });
  }
}
