import { all } from 'redux-saga/effects';
import { watchGetTopics } from './topics';
import { watchLoginUser, watchLogoutUser, watchGetUser } from './user';
import { watchGetNewProposal, watchRateProposal } from './proposal';

export default function* rootSaga() {
  yield all([
    watchGetTopics(),
    watchLoginUser(),
    watchGetUser(),
    watchLogoutUser(),

    watchGetNewProposal(),
    watchRateProposal()
  ])
}