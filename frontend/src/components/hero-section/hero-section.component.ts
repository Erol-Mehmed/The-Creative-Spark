import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/core/services/user.service';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  currentUser: any = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.me$()?.subscribe({
      next: (user) => this.currentUser = user,
      error: () => (this.currentUser = null),
    });
  }

  openAuthModal() {
    const modal = document.getElementById('auth-modal') as HTMLButtonElement;
    modal?.click();
  }
}
