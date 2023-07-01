import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { reverseRegisteredBoolean } from "./actions";

export interface IMainState {
  registered: boolean;
}

interface IAppState {
  main: IMainState;
}

const mainInitialState: IMainState = {
  registered: true
};

const MainReducer = createReducer<IMainState> (
  mainInitialState,
  on(reverseRegisteredBoolean, (state): IMainState => {
    const { registered } = state;
    console.log('on:', registered, state);
  
    return { ...state, registered: !registered };
  })
);

export const reducers: ActionReducerMap<IAppState> = {
  main: MainReducer
};
