import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostClappedArticlesComponent } from '../components/most-clapped-articles/most-clapped-articles.component';

const routes: Routes = [
  { path: '', component: MostClappedArticlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
