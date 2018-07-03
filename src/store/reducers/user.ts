import { handleActions } from 'redux-actions';

export type State = {
  readonly email?: string;
  readonly uid?: string;
}

export const initialState: State = {
  email: undefined,
  uid: undefined
}

export default handleActions({
  PERSIST_USER: (state, action) =>
    initialState,
}, initialState);
