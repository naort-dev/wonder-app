import { handleActions, createAction, Action } from 'redux-actions';
import Topic from '../../types/topic';
import Proposal from '../../types/proposal';

export interface WonderState {
  topics: Topic[];
  proposal: Proposal | null;
}

const defaultState: WonderState = {
  topics: [],
  proposal: null
};

export const persistTopics = createAction('PERSIST_TOPICS');

export default handleActions({
  PERSIST_TOPICS: (state: WonderState, action: Action<any>): WonderState => ({
    ...state,
    topics: action.payload || defaultState.topics
  }),
  PERSIST_PROPOSAL: (state: WonderState, action: Action<any>) => ({
    ...state,
    proposal: action.payload || defaultState.proposal
  })
}, defaultState);
