import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { UserService } from 'src/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  currentUser: any = null;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      this.userService.me$().subscribe({
        next: (user) => {
          this.currentUser = user;
        },
      });
    }
  }

  openModal(modalVersion: string) {
    const modalRef = this.modalService.open(AuthModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.modalVersion = modalVersion;

    // Refresh user state when modal closes
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

  logout() {
    localStorage.removeItem('access_token');
    this.currentUser = null;
    this.router.navigate(['']);
  }
}
