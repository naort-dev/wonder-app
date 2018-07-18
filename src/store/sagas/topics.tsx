import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { Action } from 'redux';
import axios from 'axios';
import { persistTopics } from '../reducers/wonder';


export const GET_TOPICS = 'GET_TOPICS';
export const getTopics = createAction(GET_TOPICS)
export function* getTopicsSaga(action: Action) {
  try {
    const response = yield call(axios, {
      method: 'GET',
      url: 'https://api.getwonderapp.com/v1/topics'
    });
    yield put(persistTopics(response));
  } catch (error) {
    console.warn(error);
  }
}

export function* watchGetTopics() {
  yield takeEvery(GET_TOPICS, getTopicsSaga);
}


export const SUGGEST_TOPIC = 'SUGGEST_TOPIC';
export const suggestTopic = createAction(SUGGEST_TOPIC);
export function* suggestTopicSaga(action: Action) {
  try {
    // yield put();
  } catch (error) {

  }
}

export function* watchSuggestTopicSaga() {
  yield takeEvery(SUGGEST_TOPIC, suggestTopicSaga);
}