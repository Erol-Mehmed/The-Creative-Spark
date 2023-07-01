import { createAction } from "@ngrx/store";

const actionTypes = {
   setModalVersion: 'SET_MODAL_VERSION'
};

export const setModalVersion = createAction(actionTypes.setModalVersion, (modalVersion: string) => ({ modalVersion }));
