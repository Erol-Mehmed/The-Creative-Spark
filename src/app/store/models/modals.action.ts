import { Action } from '@ngrx/store';
import { registerOrSignIn } from './modals.model';

export enum ModalActionType {
  CHANGE_BOOLEAN = '[BOOLEAN] Change Boolean',
}

export class ChangeBooleanAction implements Action {
  readonly type = ModalActionType.CHANGE_BOOLEAN;

  constructor(public payload: registerOrSignIn) {}
}

export type registerOrSignIn = ChangeBooleanAction;