import NavigatorService from '../../services/navigation';
import { select, call, put, takeEvery } from 'redux-saga/effects';
import { createAction, Action } from 'redux-actions';
import api from '../../services/api';
import { persistProposal } from '../actions/proposal';
import User from '../../types/user';
import UserCredentials, { UserCredentialsResponse } from '../../types/user-credentials';
import WonderAppState from '../../types/wonder-app-state';
import Proposal from '../../types/proposal';
import { Alert } from 'react-native';

const GET_NEW_PROPOSAL = 'GET_NEW_PROPOSAL';
export const getNewProposal = createAction(GET_NEW_PROPOSAL);
export function* getNewProposalSaga() {
  try {
    const state: WonderAppState = yield select();

    const response = yield call(api, {
      method: 'GET',
      url: '/proposals/new'
    }, state.user);

    yield put(persistProposal(response.data));
  } catch (error) {
    const { response } = error;

    if (response && response.status === 404) {
      // 404 - No Proposals available for user;
      yield put(persistProposal(undefined));
    } else {
      console.warn(error);
    }

  } finally {

  }
}

export function* watchGetNewProposal() {
  yield takeEvery(GET_NEW_PROPOSAL, getNewProposalSaga);
}

interface RateProposalPayload {
  proposal: Proposal;
  liked: boolean;
}
const RATE_PROPOSAL = 'RATE_PROPOSAL';
export const rateProposal = createAction(RATE_PROPOSAL);
export function* rateProposalSaga(action: Action<any>) {
  try {
    const { proposal, liked }: RateProposalPayload = action.payload;

    const state: WonderAppState = yield select();

    const { data }: { data: Proposal } = yield call(api, {
      url: '/proposals',
      method: 'POST',
      data: {
        proposal: {
          candidate_id: proposal.candidate.id,
          liked
        }
      }
    }, state.user);

    if (data.has_match) {
      Alert.alert('Match', `You have matched with ${proposal.candidate.first_name}`);
      // TODO: We are matched, show the modal
    }
  } catch (error) {
    const { response } = error;
    if (response && response.status === 422) {
      // 422 - Already rated
    } else {
      console.warn(response.status);
    }
  } finally {
    yield put(getNewProposal());
  }
}

export function* watchRateProposal() {
  yield takeEvery(RATE_PROPOSAL, rateProposalSaga);
}
