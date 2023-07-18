import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-most-clapped-articles',
  templateUrl: './most-clapped-articles.component.html',
  styleUrls: ['./most-clapped-articles.component.scss']
})

export class MostClappedArticlesComponent implements OnInit {
  mostLikedArticles: any = [];

  ngOnInit(): void {
    
  }
}
