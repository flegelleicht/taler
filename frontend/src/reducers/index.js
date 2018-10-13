import { combineReducers } from 'redux';
import login from './login';
import data from './data';
import ui from './ui';

export default combineReducers({
  login,
  data,
  ui
});
