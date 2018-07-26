import NavigatorService from '../../services/navigation';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { createAction, Action } from 'redux-actions';
import api from '../../services/api';
import { persistUser, persistAuth } from '../actions/user';
import User from '../../types/user';
import UserCredentials, { UserCredentialsResponse } from '../../types/user-credentials';
import WonderAppState from '../../types/wonder-app-state';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import { resetRegistration } from '../reducers/registration';

export const REGISTER_USER = 'REGISTER_USER';
export const registerUser = createAction(REGISTER_USER);
export function* registerUserSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();

    const { data }: { data: User } = yield call(api, {
      method: 'POST',
      url: '/users',
      data: {
        ...state.registration,
        distance_unit: 'mi',
        location: ''
      }
    });
    yield put(persistUser(data));
    yield put(resetRegistration());
    NavigatorService.navigate('Main');
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

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerUserSaga);
}

export const LOGIN_USER = 'LOGIN_USER';
export const loginUser = createAction(LOGIN_USER);
export function* loginUserSaga(action: Action<UserCredentials>) {
  try {
    if (action.payload) {
      const { email, password } = action.payload;
      const response = yield call(api, {
        method: 'POST',
        url: '/user_tokens',
        data: {
          auth: {
            email,
            password
          }
        }
      });

      yield put(persistAuth(response.data));
      yield put(getUser());
      NavigatorService.navigate('Main');
    }
  } catch (error) {
    console.warn(error);
  } finally {

  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginUserSaga);
}

const LOGOUT_USER = 'LOGOUT_USER';
export const logoutUser = createAction(LOGOUT_USER);
export function* logoutUserSaga() {
  yield put(persistAuth({}));
  yield put(persistUser({}));
  NavigatorService.navigate('onboarding');
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logoutUserSaga);
}

const GET_USER = 'GET_USER';
export const getUser = createAction(GET_USER);
export function* getUserSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();
    const { auth } = state.user;

    const { data }: { data: User } = yield call(api, {
      method: 'GET',
      url: `/users/${auth.uid}`
    },
      state.user);

    yield put(persistUser(data));
  } catch (error) {
    console.warn(error);
  } finally {

  }
}

export function* watchGetUser() {
  yield takeEvery(GET_USER, getUserSaga);
}

const UPDATE_USER = 'UPDATE_USER';
export const updateUser = createAction(UPDATE_USER);
export function* updateUserSaga(action: Action<any>) {
  try {
    const state: WonderAppState = yield select();
    const { auth } = state.user;

    const profile: Partial<User> = action.payload;

    const { data }: { data: User } = yield call(api, {
      method: 'PUT',
      url: `/users/${auth.uid}`,
      data: profile
    }, state.user);

    yield put(persistUser(data));
  } catch (error) {
    console.warn(error);
  } finally {

  }
}

export function* watchUpdateUser() {
  yield takeEvery(UPDATE_USER, updateUserSaga);
}