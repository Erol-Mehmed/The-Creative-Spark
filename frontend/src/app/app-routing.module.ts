import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from 'src/components/author/author.component';
import { HomeComponent } from 'src/components/home/home.component';
import { ArticleComponent } from "../components/article/article.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':slug', component: AuthorComponent },
  { path: ':slug/:slug', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
