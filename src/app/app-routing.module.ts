import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingArticlesComponent } from './trending-articles/trending-articles.component';

const routes: Routes = [
  { path: '', component: TrendingArticlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
