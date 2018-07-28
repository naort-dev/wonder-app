import { select, call, put, takeEvery } from 'redux-saga/effects';
import { createAction, Action } from 'redux-actions';
import api from '../../services/api';
import WonderAppState from '../../types/wonder-app-state';
import { Alert } from 'react-native';
import Partner from '../../types/partner';
import { persistActivities, persistActivity } from '../reducers/chat';
import Activity from '../../types/activity';
import ActivityDetails from '../../types/activity-details';

export const GET_PARTNERS = 'GET_PARTNERS';
export const getPartners = createAction(GET_PARTNERS);
export function* getPartnersSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();

    const { data }: { data: Partner[] } = yield call(api, {
      method: 'GET',
      url: '/partners'
    }, state.user);

    // yield persistPar
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

export function* watchGetPartners() {
  yield takeEvery(GET_PARTNERS, getPartnersSaga);
}

export const GET_PARTNER_ACTIVITIES = 'GET_PARTNER_ACTIVITIES';
export const getPartnerActivities = createAction(GET_PARTNER_ACTIVITIES);
export function* getPartnerActivitiesSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();

    const { data }: { data: Activity[] } = yield call(api, {
      method: 'GET',
      url: `/partners/${action.payload.id}/activities`
    }, state.user);

    yield put(persistActivities(data));
    // yield put(persistUser(data));
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

export function* watchGetPartnerActivities() {
  yield takeEvery(GET_PARTNER_ACTIVITIES, getPartnerActivitiesSaga);
}

const GET_ACTIVITY_DETAILS = 'GET_ACTIVITY_DETAILS';
export const getActivityDetails = createAction(GET_ACTIVITY_DETAILS);
export function* getActivityDetailsSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();

    const { data }: { data: ActivityDetails } = yield call(api, {
      method: 'GET',
      url: `/activities/${action.payload.id}`
    }, state.user);

    yield put(persistActivity(data));
    // yield put(persistUser(data));
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

export function* watchGetActivityDetails() {
  yield takeEvery(GET_ACTIVITY_DETAILS, getActivityDetailsSaga);
}