import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { setModalVersion } from "./actions";

export interface IMainState {
  signInGetStarted: string;
}

interface IAppState {
  main: IMainState;
}

const mainInitialState: IMainState = {
  signInGetStarted: ''
};

const MainReducer = createReducer<IMainState> (
  mainInitialState,
  on(setModalVersion, (state): IMainState => {
    const { signInGetStarted } = state;
    console.log('on:', signInGetStarted, state);
  
    return { ...state, signInGetStarted: signInGetStarted };
  })
);

export const reducers: ActionReducerMap<IAppState> = {
  main: MainReducer
};
