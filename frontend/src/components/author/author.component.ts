import { Component } from '@angular/core';
import { AuthorInfoObject } from '../../shared/interfaces/authorInfo';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})

export class AuthorComponent {
  authorInfo: AuthorInfoObject = {
    name: '',
    description: '',
  };

  setAuthorInfo($event: AuthorInfoObject) {    
    this.authorInfo = $event;
  };
}
