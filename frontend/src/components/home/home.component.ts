import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  constructor(private http: HttpClient) {}

  hasArticles: boolean = false;

  ngOnInit() {
    window.scrollTo(0, 0);

    this.http.get('/api/articles?has-articles=1').subscribe((boolean: any) => {
      this.hasArticles = boolean;
    });
  }
}
