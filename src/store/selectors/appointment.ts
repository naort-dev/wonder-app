import _ from 'lodash';
import { createSelector, OutputSelector } from 'reselect';
import { selectCurrentUser } from './user';
import moment from 'moment-timezone';
import { isAppointmentBeforeToday, isAppointmentAfterToday } from 'src/utils/appointment';
import WonderAppState from 'src/models/wonder-app-state';
import Appointment, { DecoratedAppointment, AppointmentUser } from 'src/models/appointment';
import User from 'src/models/user';

const allAppointments = (state: WonderAppState) => state.wonder.appointments;

const decorateAppointment = (appointment: Appointment, me: User): DecoratedAppointment | undefined => {
  if (appointment) {
    const result: DecoratedAppointment = {
      ...appointment,
      me,
      match: appointment.users.find((user: AppointmentUser) => user.id !== me.id),
      eventMoment: appointment.event_at ? moment(appointment.event_at) : undefined
    };

    return result;
  }
  return undefined;
};

export const selectUpcomingAppointments = createSelector(
  [selectCurrentUser, allAppointments],
  (currentUser, appointments) => {
    return _.sortBy(appointments, 'event_at')
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
