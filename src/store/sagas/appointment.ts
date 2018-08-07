import { select, call, put, takeEvery } from 'redux-saga/effects';
import { createAction, Action } from 'redux-actions';
import api from '../../services/api';
import WonderAppState from '../../types/wonder-app-state';
import { Alert } from 'react-native';
import Appointment from '../../types/appointment';
import { persistAppointments } from '../reducers/wonder';

export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
export const getAppointments = createAction(GET_APPOINTMENTS);
export function* getAppointmentsSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();

    const { data }: { data: Appointment[] } = yield call(api, {
      method: 'GET',
      url: '/appointments'
    }, state.user);

    yield put(persistAppointments(data));
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

// {
// 	"invited_user_id": 251,
// 	"appointment": {
// 		"name": "That Place",
// 		"location": "That Location",
// 		"latitude": 0,
// 		"longitude": 0,
// 		"event_at": "2018-08-19",
// 		"topic_id": 333
// 	}
// }
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