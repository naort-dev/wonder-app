import { handleActions, createAction, Action } from 'redux-actions';
import Conversation from '../../types/conversation';
import Activity from '../../types/activity';

export interface ChatState {
  readonly conversations: Conversation[];
  readonly activities: Activity[];
}

export const initialState: ChatState = {
  conversations: [],
  activities: []
};

export const persistConversations = createAction('PERSIST_CONVERSATIONS');
export const persistActivities = createAction('PERSIST_ACTIVITIES');
export default handleActions({
  PERSIST_CONVERSATIONS: (state: ChatState, action: Action<any>) => ({
    ...state,
    conversations: action.payload || initialState.conversations,
  }),
  PERSIST_ACTIVITIES: (state: ChatState, action: Action<any>) => ({
    ...state,
    activities: action.payload || initialState.activities
  }),
  LOGOUT_USER: () => initialState
}, initialState);
