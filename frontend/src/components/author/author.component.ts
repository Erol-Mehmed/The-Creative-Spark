import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    console.log('data:', this.route.snapshot.queryParams['id']);
  }
}
