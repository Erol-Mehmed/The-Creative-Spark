import { Component, OnInit } from '@angular/core';
import { AuthorInfoObject } from '../../shared/interfaces/authorInfo';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})

export class AuthorComponent implements OnInit {
  authorInfo: AuthorInfoObject = {
    name: '',
    description: '',
  };

  ngOnInit() {
    window.scrollTo(0, 0);
  };

  setAuthorInfo($event: AuthorInfoObject) {    
    this.authorInfo = $event;
  };
}
