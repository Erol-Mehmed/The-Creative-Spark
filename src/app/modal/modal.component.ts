import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentModalVersion } from '../+store/selectors';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  constructor(private store: Store) {
    this.currentModalVersion$.subscribe(version => {
      this.loginRegister = version === 'getStarted'
       ?
       {
        title:  'Join The Creative Spark.',
        upIn: 'up',
        question: 'Already have an account?',
        signInCreateOne: 'Sign in',
        signInUp: 'SignUp'
      }
      :
      {
        title: 'Welcome back.',
        upIn: 'in',
        question: 'No account?',
        signInCreateOne: 'Create one',
        signInUp: 'Sign in'
      };
      this.registered = version === 'getStarted';
    });
  }
  
  loginRegister = {
    title: '',
    upIn: '',
    question: '',
    signInCreateOne: '',
    signInUp: ''
  };
  currentModalVersion$ = this.store.select(selectCurrentModalVersion);
  registered = true;

  modalChange() {    
    if (this.registered) {
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

    this.registered = !this.registered;
  }
}
