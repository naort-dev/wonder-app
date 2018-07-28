import { handleActions, createAction, Action } from 'redux-actions';
import Conversation from '../../types/conversation';
import Activity from '../../types/activity';
import ActivityDetails from '../../types/activity-details';

export interface ChatState {
  readonly conversations: Conversation[];
  readonly activities: Activity[];
  readonly activity: ActivityDetails | null;
}

export const initialState: ChatState = {
  conversations: [],
  activities: [],
  activity: null
};

export const persistConversations = createAction('PERSIST_CONVERSATIONS');
export const persistActivities = createAction('PERSIST_ACTIVITIES');
export const persistActivity = createAction('PERSIST_ACTIVITY');
export default handleActions({
  PERSIST_CONVERSATIONS: (state: ChatState, action: Action<any>) => ({
    ...state,
    conversations: action.payload || initialState.conversations,
  }),
  PERSIST_ACTIVITY: (state: ChatState, action: Action<any>) => ({
    ...state,
    activity: action.payload || initialState.activity
  }),
  PERSIST_ACTIVITIES: (state: ChatState, action: Action<any>) => ({
    ...state,
    activities: action.payload || initialState.activities
  }),
  LOGOUT_USER: () => initialState
}, initialState);
