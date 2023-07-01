import { createAction } from "@ngrx/store";

const actionTypes = {
   reverseRegisteredBoolean: 'REVERSED'
};

export const reverseRegisteredBoolean = createAction(actionTypes.reverseRegisteredBoolean);
