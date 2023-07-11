import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentModalVersion } from '../+store/selectors';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {
  constructor (
    private store: Store,
    private authService: SocialAuthService,
    private fb: FormBuilder
    ) {
    this.currentModalVersion$.subscribe(version => {
      this.loginRegister = version === 'getStarted'
       ?
       {
        title:  'Join The Creative Spark.',
        upIn: 'up',
        question: 'Already have an account?',
        signInCreateOne: 'Sign in',
        signInUp: 'Sign Up'
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
      this.currentModalVersionLocal = version;
    });
  }
  
  myForm!: FormGroup;
  loginRegister = {
    title: '',
    upIn: '',
    question: '',
    signInCreateOne: '',
    signInUp: ''
  };
  currentModalVersion$ = this.store.select(selectCurrentModalVersion);
  registered = true;
  openLoginRegisterForm: boolean = false;
  currentModalVersionLocal: string = '';
  loginRegisterFormSubtitle: string = this.currentModalVersionLocal === 'getStarted'
  ? 'Enter your username, email and password to create an account.'
  : 'Enter your email and password to sing in.';

  loginRegisterForm() {
    this.openLoginRegisterForm = true;
    this.loginRegister.title = `${this.loginRegister.signInUp}`;
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  modalChange() {
    this.currentModalVersionLocal = this.currentModalVersionLocal === 'getStarted' ? 'signIn' : 'getStarted';
    
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

  ngOnInit() {
    this.myForm = this.fb.group({
      name: this.loginRegister.signInUp === 'Sign Up' 
      ? ['', Validators.required]
      : '',
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Password', form.value.password);
  }
}
