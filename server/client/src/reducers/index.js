import { combineReducers } from 'redux';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer //the auth piece of state, is being produced by the authReducer, auth will be the key in our store object that holds all the state
  //whatever keys we pass into combineReducers object will represent the keys that exist in our state object
});
