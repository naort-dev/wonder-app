import { handleActions, createAction, Action } from 'redux-actions';
import Topic from '../../types/topic';

export interface RegistrationState {
  readonly first_name: string | null;
  readonly last_name: string | null;
  readonly email: string | null;
  readonly phone: string | null;

  readonly gender: string | null;
  readonly birthday: string | null;
  readonly occupation: string | null;
  readonly education: string | null;

  readonly about: string | null;

  readonly images: any[];
  readonly video: any;

  readonly topics: Topic[];
}

const defaultState: RegistrationState = {
  first_name: null,
  last_name: null,
  email: null,
  phone: null,

  gender: null,
  birthday: null,
  occupation: null,
  education: null,
  about: null,
  images: [],
  video: null,
  topics: []
};

export const persistRegistrationInfo = createAction('PERSIST_REGISTRATION_INFO');
export const resetRegistration = createAction('RESET_REGISTRATION');

export default handleActions({
  PERSIST_REGISTRATION_INFO: (state: RegistrationState, action: Action<any>): RegistrationState => ({
    ...state,
    ...action.payload
  }),
  LOGOUT_USER: () => defaultState,
  RESET_REGISTRATION: (state: RegistrationState, action: Action<any>): RegistrationState => defaultState
}, defaultState);
