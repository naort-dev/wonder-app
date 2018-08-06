import { createSelector } from 'reselect';
import WonderAppState from '../../types/wonder-app-state';
import Appointment, { DecoratedAppointment } from '../../types/appointment';
import { selectCurrentUser } from './user';
import User from '../../types/user';
import moment from 'moment-timezone';
import { isAppointmentBeforeToday, isAppointmentAfterToday } from '../../utils/appointment';

const allAppointments = (state: WonderAppState) => state.wonder.appointments;

const decorateAppointment = (appointment: Appointment, me: User): DecoratedAppointment | undefined => {
  if (appointment) {
    const result: DecoratedAppointment = {
      ...appointment,
      me,
      match: appointment.users.find((user: User) => user.id !== me.id)
    };

    return result;
  }
  return undefined;
};

export const selectUpcomingAppointments = createSelector(
  [selectCurrentUser, allAppointments],
  (currentUser, appointments) => {
    return appointments
      .map((a: Appointment) => decorateAppointment(a, currentUser))
      .filter(isAppointmentAfterToday);
  }
);

export const selectPastAppointments = createSelector(
  [selectCurrentUser, allAppointments],
  (currentUser, appointments) => {
    return appointments
      .map((a: Appointment) => decorateAppointment(a, currentUser))
      .filter(isAppointmentBeforeToday);
  }
);
