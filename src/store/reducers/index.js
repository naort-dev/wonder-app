import { combineReducers } from 'redux';
import user from './user';
import wonder from './wonder';
import registration from './registration';
import chat from './chat';

export default combineReducers({
  chat,
  user,
  wonder,
  registration
});