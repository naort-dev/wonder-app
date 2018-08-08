import { handleActions, createAction, Action } from 'redux-actions';
import Conversation from '../../types/conversation';
import Activity from '../../types/activity';
import ActivityDetails from '../../types/activity-details';

export interface AppointmentState {
  readonly matchId?: number | null;
  readonly activity?: ActivityDetails | null;
}

export const initialState: AppointmentState = {
  matchId: null,
  activity: null
};

export const persistAppointmentData = createAction('PERSIST_APPOINTMENT_DATA');
export const resetAppointment = createAction('RESET_APPOINTMENT');

export default handleActions({
  PERSIST_APPOINTMENT_DATA: (state: AppointmentState, action: Action<any>) => ({
    ...state,
    ...action.payload
  }),
  RESET_APPOINTMENT: () => initialState,
  LOGOUT_USER: () => initialState
}, initialState);
