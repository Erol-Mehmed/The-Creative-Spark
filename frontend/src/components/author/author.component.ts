import { Component, OnInit } from '@angular/core';
import Author from '../../shared/interfaces/author';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})

export class AuthorComponent implements OnInit {
  author: Author = {
    name: '',
    description: '',
  };

  ngOnInit() {
    window.scrollTo(0, 0);
  };

  setAuthorInfo($event: Author) {
    this.author = $event;
  };
}
