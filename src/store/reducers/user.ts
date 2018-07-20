import { handleActions } from 'redux-actions';

export type UserState = {
  readonly email?: string;
  readonly uid?: string;
  readonly token?: string;
}

export const initialState: UserState = {
  email: undefined,
  uid: undefined,
  token: undefined
}

export default handleActions({
  PERSIST_USER: (state, action) =>
    initialState,
}, initialState);
