import { createAction } from "@ngrx/store";

const actionTypes = {
   reverseBoolean: 'REVERSE'
  };

  export const reverseBoolean = createAction(actionTypes.reverseBoolean);