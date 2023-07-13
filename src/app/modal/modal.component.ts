import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentModalVersion } from '../+store/selectors';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhiteSpaceValidator } from 'src/shared/whitespace.validator';
import { passwordsMatchCheck } from 'src/shared/passwords-match.validator';
// @ts-ignore
import { register, login } from '../../../backend/services/users';

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
      this.loginRegisterFormSubtitle = version === 'getStarted'
      ? 'Enter your username, email and password to create an account.'
      : 'Enter your email and password to sing in.';
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
  loginRegisterFormSubtitle: string = '';

  loginRegisterForm() {
    this.openLoginRegisterForm = true;
    this.loginRegister.title = `${this.loginRegister.signInUp}`;    
  }

  toPreviousModalVersion() {
    this.openLoginRegisterForm = false;
    this.myForm.reset();
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  modalChange() {
    this.currentModalVersionLocal = this.currentModalVersionLocal === 'getStarted' ? 'signIn' : 'getStarted';
    this.loginRegisterFormSubtitle = this.currentModalVersionLocal === 'getStarted'
    ? 'Enter your username, email and password to create an account.'
    : 'Enter your email and password to sing in.';
    
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
      ? ['', [Validators.required, noWhiteSpaceValidator]]
      : '',
      email: ['', [Validators.required, Validators.email, noWhiteSpaceValidator]],
      password: ['', [Validators.required, Validators.minLength(6), noWhiteSpaceValidator]],
      confirmPassword: this.loginRegister.signInUp === 'Sign Up'
      ? ['', [Validators.required, Validators.minLength(6), noWhiteSpaceValidator]]
      : ''
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('Password', form.value.password);
    console.log('Confirm Password', form.value.confirmPassword);

    if (this.currentModalVersionLocal === 'getStarted') {
      register(form.value.name, form.value.email, form.value.password);
    } else {
      login(form.value.email, form.value.password);
    }
  }
}
