import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpSignInModalComponent } from './sign-up-sign-in-modal.component';

describe('SignUpSignInModalComponent', () => {
  let component: SignUpSignInModalComponent;
  let fixture: ComponentFixture<SignUpSignInModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpSignInModalComponent]
    });
    fixture = TestBed.createComponent(SignUpSignInModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
