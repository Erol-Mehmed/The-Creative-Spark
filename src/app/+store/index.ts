import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { reverseBoolean } from "./actions";

interface IMainState {
  registered: boolean;
}

interface IAppState {
  main: IMainState;
}

const mainInitialState: IMainState = {
  registered: false
};

const MainReducer = createReducer<IMainState> (
  mainInitialState,
  on(reverseBoolean, (state) => {
    const { registered } = state;
    return { ...state, registered: !registered};
  })
);

const reducers: ActionReducerMap<IAppState> = {
  main:
};