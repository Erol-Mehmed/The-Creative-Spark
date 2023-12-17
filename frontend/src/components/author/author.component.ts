import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.params['slug'];
    console.log('slug:', slug);

    this.http.get(`/api/${slug}`).subscribe({
      next: (data) => {
        console.log('author:', data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
