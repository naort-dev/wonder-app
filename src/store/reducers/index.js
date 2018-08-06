import { combineReducers } from 'redux';
import user from './user';
import wonder from './wonder';
import registration from './registration';
import chat from './chat';
import config from './config';

export default combineReducers({
  config,
  chat,
  user,
  wonder,
  registration
});