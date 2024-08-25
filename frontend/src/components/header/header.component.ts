import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(private modalService: NgbModal) {}

  openModal(modalVersion: string) {
    const modalRef = this.modalService.open(AuthModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.modalVersion = modalVersion;

    console.log('header open modal>>', modalVersion);
  }
}
