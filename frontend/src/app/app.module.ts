import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../components/header/header.component';
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
import { AllArticlesComponent } from 'src/components/all-articles/all-articles.component';
import { HomeComponent } from 'src/components/home/home.component';
import { TopicsComponent } from 'src/components/topics/topics.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalComponent,
    MostLikedArticlesComponent,
    AllArticlesComponent,
    HomeComponent,
    TopicsComponent,
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
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
