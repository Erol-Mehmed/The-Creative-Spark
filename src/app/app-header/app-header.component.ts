import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  constructor(public matDialog: MatDialog) { }

  openModal(signInCreateOne: boolean) {
    const dialogConfig = new MatDialogConfig;
    
    dialogConfig.id = 'modal-component';
    dialogConfig.width = '550px';
    dialogConfig.height = '650px';
    dialogConfig.data = {register: signInCreateOne};
    
    this.matDialog.open(ModalComponent, dialogConfig);
  }
}
