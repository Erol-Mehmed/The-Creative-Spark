import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Store } from '@ngrx/store';
import { setModalVersion } from '../../store/actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(private store: Store) {}
  
  openModal(currentModalVersion: string) {
    this.store.dispatch(setModalVersion({ currentModalVersion }));
  }
}
