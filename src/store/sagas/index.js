import { all } from 'redux-saga/effects';
import { watchGetTopics } from './topics';

export default function* rootSaga() {
  yield all([
    watchGetTopics()
  ])
}