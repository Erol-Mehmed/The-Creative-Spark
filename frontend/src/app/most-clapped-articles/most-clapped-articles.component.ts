import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-most-clapped-articles',
  templateUrl: './most-clapped-articles.component.html',
  styleUrls: ['./most-clapped-articles.component.scss']
})

export class MostClappedArticlesComponent implements OnInit {
  mostLikedArticles: any = [];

  ngOnInit(): void {
    this.mostLikedArticles = axios.get('http://localhost:3000/datas');
    console.log(this.mostLikedArticles);
    
  }
}
