import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from '../components/app-header/app-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store';
import { ReactiveFormsModule } from '@angular/forms';
import { MostLikedArticlesComponent } from '../components/most-liked-articles/most-liked-articles.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ModalComponent,
    MostLikedArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    StoreModule.forRoot(reducers),
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
