import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+store';
import { ReactiveFormsModule } from '@angular/forms';
import { MostClappedArticlesComponent } from './most-clapped-articles/most-clapped-articles.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ModalComponent,
    MostClappedArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forRoot(reducers),
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
