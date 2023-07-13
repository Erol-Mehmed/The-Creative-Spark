import { AbstractControl } from "@angular/forms";

export function passwordsMatchCheck(control: AbstractControl) {
  const password = control.value.password;
  const confirmPassword = control.value;

  console.log(password, confirmPassword);

  if (password !== confirmPassword) {
    return { 'no match': true };
  }

  return null;
}
