import { select, call, put, takeEvery } from 'redux-saga/effects';
import { createAction, Action } from 'redux-actions';
import api from '../../services/api';
import WonderAppState from '../../types/wonder-app-state';
import { Alert } from 'react-native';
import Appointment from '../../types/appointment';

export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
export const getAppointments = createAction(GET_APPOINTMENTS);
export function* getAppointmentsSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();

    const { data }: { data: Appointment[] } = yield call(api, {
      method: 'GET',
      url: '/appointments'
    }, state.user);

    // yield put(persistUser(data));
    // yield put(resetRegistration());
  } catch (error) {
    if (error.response) {
      Alert.alert('ERROR', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {
    // yield put(getUser());
  }
}

export function* watchGetAppointments() {
  yield takeEvery(GET_APPOINTMENTS, getAppointmentsSaga);
}

export const CREATE_APPOINTMENT = 'CREATE_APPOINTMENT';
export const createAppointment = createAction(CREATE_APPOINTMENT);
export function* createAppointmentSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();

    const { data }: { data: Appointment[] } = yield call(api, {
      method: 'POST',
      url: '/appointments',
      data: action.payload
    }, state.user);

    // yield put(persistUser(data));
    // yield put(resetRegistration());
  } catch (error) {
    if (error.response) {
      Alert.alert('ERROR', JSON.stringify(error.response.data));
    } else {
      console.warn(error);
    }
  } finally {
    // yield put(getUser());
  }
}

export function* watchCreateAppointment() {
  yield takeEvery(CREATE_APPOINTMENT, createAppointmentSaga);
}