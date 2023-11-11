import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Store } from '@ngrx/store';
import { setModalVersion } from '../../store/actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(public matDialog: MatDialog, private store: Store) {}
  
  openModal(currentModalVersion: string) {
    this.store.dispatch(setModalVersion({ currentModalVersion }));

    const dialogConfig = new MatDialogConfig;
    
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '550px';
    dialogConfig.height = '650px';

    this.matDialog.open(ModalComponent, dialogConfig);
  }
}
