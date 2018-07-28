import { all } from 'redux-saga/effects';
import { watchGetTopics } from './topics';
import { watchLoginUser, watchLogoutUser, watchGetUser, watchUpdateUser, watchRegisterUser } from './user';
import { watchGetNewProposal, watchRateProposal } from './proposal';
import { watchCreateAppointment, watchGetAppointments } from './appointment';
import { watchGetPartners, watchGetPartnerActivities } from './partner';
import { watchGetConversation, watchGetConversations } from './conversations';

export default function* rootSaga() {
  yield all([
    watchGetTopics(),

    // User
    watchLoginUser(),
    watchGetUser(),
    watchUpdateUser(),
    watchRegisterUser(),
    watchLogoutUser(),

    // Proposals
    watchGetNewProposal(),
    watchRateProposal(),

    // Appointments
    watchGetAppointments(),
    watchCreateAppointment(),

    // Partners
    watchGetPartners(),
    watchGetPartnerActivities(),

    // Conversation
    watchGetConversation(),
    watchGetConversations()
  ])
}