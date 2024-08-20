import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
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

    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.modalVersion = currentModalVersion;

    console.log('open modal>>', currentModalVersion);
  }
}
