import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostLikedArticlesComponent } from '../components/most-liked-articles/most-liked-articles.component';

const routes: Routes = [
  { path: '', component: MostLikedArticlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
