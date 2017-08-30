import { FETCH_USER } from '../actions/types.js';

export default function(state = null, action) {
  //state initially set to null, means when the app first runs by default we dont know if the user is logged in, so it will return the default: return state
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //User model either an object or empty string, if empty string then false. Empty string, undefined, null all are false.
    default:
      return state;
  }
}
