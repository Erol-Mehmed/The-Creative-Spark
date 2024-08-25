import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhiteSpaceValidator } from '../../shared/whitespace.validator';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})

export class AuthModalComponent implements OnInit {
  @Input() modalVersion: string | undefined;

  constructor (
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  registerForm!: FormGroup;
  loginForm!: FormGroup;
  loginOrRegister = {
    title: '',
    upOrIn: '',
    question: '',
    signInCreateOne: '',
  };

  loginOrRegisterFormSubtitle: string = '';

  modalChange() {
    this.loginOrRegisterFormSubtitle = this.modalVersion === 'getStarted'
      ? 'Enter your email and password to sing in.'
      : 'Enter your username, email and password to create an account.';

    if (this.modalVersion === 'getStarted') {
      this.loginOrRegister.title = 'Welcome back.';
      this.loginOrRegister.upOrIn = 'in';
      this.loginOrRegister.question = 'No account?';
      this.loginOrRegister.signInCreateOne = 'Create one';
    } else {
      this.loginOrRegister.title = 'Join The Creative Spark.';
      this.loginOrRegister.upOrIn = 'up';
      this.loginOrRegister.question = 'Already have an account?';
      this.loginOrRegister.signInCreateOne = 'Sign in';
    }

    this.modalVersion = this.modalVersion === 'getStarted' ? 'signIn' : 'getStarted';

    this.cdr.detectChanges();
    document.querySelector('.modal-content-wrapper')?.querySelector('input')?.focus();
  }

  ngOnInit(): void {
    // Initialize the form group
    this.loginOrRegister = this.modalVersion === 'getStarted'
      ?
      {
        title:  'Join The Creative Spark.',
        upOrIn: 'up',
        question: 'Already have an account?',
        signInCreateOne: 'Sign in',
      }
      :
      {
        title: 'Welcome back.',
        upOrIn: 'in',
        question: 'No account?',
        signInCreateOne: 'Create one',
      };

    this.loginOrRegisterFormSubtitle = this.modalVersion === 'getStarted'
      ? 'Enter your username, email and password to create an account.'
      : 'Enter your email and password to sing in.';

    console.log('modalVersion>>', this.modalVersion, this.loginOrRegister, this.loginOrRegisterFormSubtitle);

    // Set the validators for the forms
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
