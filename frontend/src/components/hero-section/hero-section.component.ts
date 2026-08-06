import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent implements OnInit {
  currentUser: any = null;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.userService.me$()?.subscribe({
        next: (user) => this.currentUser = user,
        error: () => (this.currentUser = null),
      });
    }
  }

  openAuthModal() {
    const modalRef = this.modalService.open(AuthModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.modalVersion = 'login';

    modalRef.result.then(
      () => {
        const token = localStorage.getItem('access_token');
        if (token) {
          this.userService.me$().subscribe({
            next: (user) => this.currentUser = user,
            error: () => {},
          });
        }
      },
      () => {},
    );
  }
}
