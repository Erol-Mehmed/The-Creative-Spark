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
import { MostClappedArticlesComponent } from '../components/most-clapped-articles/most-clapped-articles.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from 'src/core/core.module';

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
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}