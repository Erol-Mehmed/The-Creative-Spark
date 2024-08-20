import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() modalVersion: string | undefined;

  constructor(public activeModal: NgbActiveModal) {}
}


// export class ModalComponent implements OnInit {
//   constructor (
//     private store: Store,
//     private fb: FormBuilder,
//     private userService: UserService
//   ) {
//     this.currentModalVersion$.subscribe(version => {
//       this.loginRegister = version === 'getStarted'
//         ?
//         {
//           title:  'Join The Creative Spark.',
//           upIn: 'up',
//           question: 'Already have an account?',
//           signInCreateOne: 'Sign in',
//         }
//         :
//         {
//           title: 'Welcome back.',
//           upIn: 'in',
//           question: 'No account?',
//           signInCreateOne: 'Create one',
//         };
//       this.registered = version === 'getStarted';
//       this.currentModalVersionLocal = version;
//       this.loginRegisterFormSubtitle = version === 'getStarted'
//         ? 'Enter your username, email and password to create an account.'
//         : 'Enter your email and password to sing in.';
//     });
//   }
//
//   registerForm!: FormGroup;
//   loginForm!: FormGroup;
//   loginRegister = {
//     title: '',
//     upIn: '',
//     question: '',
//     signInCreateOne: '',
//   };
//   currentModalVersion$ = this.store.select(selectCurrentModalVersion);
//   registered = true;
//   currentModalVersionLocal: string = '';
//   loginRegisterFormSubtitle: string = '';
//
//   modalChange() {
//     this.currentModalVersionLocal = this.currentModalVersionLocal === 'getStarted' ? 'signIn' : 'getStarted';
//     this.loginRegisterFormSubtitle = this.currentModalVersionLocal === 'getStarted'
//       ? 'Enter your username, email and password to create an account.'
//       : 'Enter your email and password to sing in.';
//
//     if (this.registered) {
//       this.loginRegister.title = 'Welcome back.';
//       this.loginRegister.upIn = 'in';
//       this.loginRegister.question = 'No account?';
//       this.loginRegister.signInCreateOne = 'Create one';
//     } else {
//       this.loginRegister.title = 'Join The Creative Spark.';
//       this.loginRegister.upIn = 'up';
//       this.loginRegister.question = 'Already have an account?';
//       this.loginRegister.signInCreateOne = 'Sign in';
//     }
//
//     this.registered = !this.registered;
//   }
//
//   ngOnInit(): void {
//     this.registerForm = this.fb.group({
//       name: ['', [Validators.required, noWhiteSpaceValidator]],
//       email: ['', [Validators.required, Validators.email, noWhiteSpaceValidator]],
//       password: ['', [Validators.required, Validators.minLength(6), noWhiteSpaceValidator]],
//       confirmPassword: ['', [Validators.required, Validators.minLength(6), noWhiteSpaceValidator]]
//     });
//
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email, noWhiteSpaceValidator]],
//       password: ['', [Validators.required, Validators.minLength(6), noWhiteSpaceValidator]],
//     });
//   }
