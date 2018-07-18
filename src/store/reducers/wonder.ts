import { handleActions, createAction } from 'redux-actions';
import Topic from '../../types/topic';

interface WonderState {
  topics: Topic[]
}

const defaultState: WonderState = {
  topics: []
};

export const persistTopics = createAction('PERSIST_TOPICS');

export default handleActions({
  PERSIST_TOPICS: (state: WonderState, action) => ({
    ...state,
    topics: action.payload
  })
}, defaultState);