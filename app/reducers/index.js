import { combineReducers } from 'redux';
import auth from './auth';
import notice from './notice';

export default combineReducers({
  notice,
  auth,
});
