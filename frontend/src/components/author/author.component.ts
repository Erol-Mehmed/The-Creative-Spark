import { Component, OnInit } from '@angular/core';
import { Author } from '../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/core/services/user.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})

export class AuthorComponent implements OnInit {
  author: Author = {
    name: '',
    description: '',
    image: '',
  };

  currentUser: any = null;
  editing = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    this.userService.me$()?.subscribe({
      next: (user) => this.currentUser = user,
      error: () => (this.currentUser = null),
    });
  };

  setAuthorInfo($event: Author) {
    this.author = $event;
  };

  isOwner() {
    const username = this.route.snapshot.params['username'];
    return this.currentUser && this.currentUser.username === username;
  }

  toggleEdit() {
    this.editing = !this.editing;
  }
}
