import { all } from 'redux-saga/effects';
import { watchGetTopics } from './topics';
import { watchLoginUser, watchLogoutUser, watchGetUser, watchUpdateUser, watchRegisterUser } from './user';
import { watchGetNewProposal, watchRateProposal } from './proposal';

export default function* rootSaga() {
  yield all([
    watchGetTopics(),
    watchLoginUser(),
    watchGetUser(),
    watchUpdateUser(),
    watchRegisterUser(),
    watchLogoutUser(),

    watchGetNewProposal(),
    watchRateProposal()
  ])
}