import { combineReducers } from 'redux';
import user from './user';
import wonder from './wonder';

export default combineReducers({
  user,
  wonder
});