import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGetModalVersion } from '../+store/selectors';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  constructor(private store: Store) {}

  register = true;
  signInGetStarted$ = this.store.select(selectGetModalVersion);
  
  loginRegister = {
    title:  'Join The Creative Spark.',
    upIn: 'up',
    question: 'Already have an account?',
    signInCreateOne: 'Sign in',
    signInUp: 'SignUp'
  };
  
  modalChange() {
    console.log("test:", this.signInGetStarted$);
    if (this.register) {
      this.loginRegister.title = 'Welcome back.';
      this.loginRegister.upIn = 'in';
      this.loginRegister.question = 'No account?';
      this.loginRegister.signInCreateOne = 'Create one';
      this.loginRegister.signInUp = 'Sign in';
    } else {
      this.loginRegister.title = 'Join The Creative Spark.';
      this.loginRegister.upIn = 'up';
      this.loginRegister.question = 'Already have an account?';
      this.loginRegister.signInCreateOne = 'Sign in';
      this.loginRegister.signInUp = 'Sign up';
    }

    this.register = !this.register;
  }
}
