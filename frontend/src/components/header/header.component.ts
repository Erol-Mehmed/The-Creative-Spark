import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignUpSignInModalComponent } from '../sign-up-sign-in-modal/sign-up-sign-in-modal.component';
import { Store } from '@ngrx/store';
import { setModalVersion } from '../../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private modalService: NgbModal, private store: Store) {}

  openModal(currentModalVersion: string) {
    this.store.dispatch(setModalVersion({ currentModalVersion }));

    const modalRef = this.modalService.open(SignUpSignInModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.modalVersion = currentModalVersion;

    console.log('open modal>>', currentModalVersion);
  }
}
