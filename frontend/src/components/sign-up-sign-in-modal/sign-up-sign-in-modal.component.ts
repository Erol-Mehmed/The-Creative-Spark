import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhiteSpaceValidator } from '../../shared/whitespace.validator';

@Component({
  selector: 'app-sign-up-sign-in-modal',
  templateUrl: './sign-up-sign-in-modal.component.html',
  styleUrls: ['./sign-up-sign-in-modal.component.scss']
})

export class SignUpSignInModalComponent implements OnInit {
  @Input() currentModalVersion: string | undefined;

  constructor (
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginOrRegister = this.currentModalVersion === 'getStarted'
      ?
      {
        title:  'Join The Creative Spark.',
        upIn: 'up',
        question: 'Already have an account?',
        signInCreateOne: 'Sign in',
      }
      :
      {
        title: 'Welcome back.',
        upIn: 'in',
        question: 'No account?',
        signInCreateOne: 'Create one',
      };
    this.registered = this.currentModalVersion === 'getStarted';
    this.loginOrRegisterFormSubtitle = this.currentModalVersion === 'getStarted'
      ? 'Enter your username, email and password to create an account.'
      : 'Enter your email and password to sing in.';
  }

  registerForm!: FormGroup;
  loginForm!: FormGroup;
  loginOrRegister = {
    title: '',
    upIn: '',
    question: '',
    signInCreateOne: '',
  };

  registered = true;
  loginOrRegisterFormSubtitle: string = '';

  modalChange() {
    this.currentModalVersion = this.currentModalVersion === 'getStarted' ? 'signIn' : 'getStarted';
    this.loginOrRegisterFormSubtitle = this.currentModalVersion === 'getStarted'
      ? 'Enter your username, email and password to create an account.'
      : 'Enter your email and password to sing in.';

    if (this.registered) {
      this.loginOrRegister.title = 'Welcome back.';
      this.loginOrRegister.upIn = 'in';
      this.loginOrRegister.question = 'No account?';
      this.loginOrRegister.signInCreateOne = 'Create one';
    } else {
      this.loginOrRegister.title = 'Join The Creative Spark.';
      this.loginOrRegister.upIn = 'up';
      this.loginOrRegister.question = 'Already have an account?';
      this.loginOrRegister.signInCreateOne = 'Sign in';
    }

    this.registered = !this.registered;

    this.cdr.detectChanges();
    document.querySelector('.modal-content-wrapper')?.querySelector('input')?.focus();
  }

  ngOnInit(): void {
    console.log('currentModalVersion>>', this.currentModalVersion, this.activeModal);

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, noWhiteSpaceValidator]],
      email: ['', [Validators.required, Validators.email, noWhiteSpaceValidator]],
      password: ['', [Validators.required, Validators.minLength(6), noWhiteSpaceValidator]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), noWhiteSpaceValidator]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, noWhiteSpaceValidator]],
      password: ['', [Validators.required, Validators.minLength(6), noWhiteSpaceValidator]],
    });
  }

  onSubmit(registerOrLoginForm: FormGroup) {
    console.log('modal form>>', registerOrLoginForm.value);
  }
}
