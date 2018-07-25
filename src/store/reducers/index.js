import { combineReducers } from 'redux';
import user from './user';
import wonder from './wonder';
import registration from './registration';

export default combineReducers({
  user,
  wonder,
  registration
});