import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { appInterceptorProvider } from './app-interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    appInterceptorProvider,
  ],
})
export class CoreModule { }
