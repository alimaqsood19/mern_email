import axios from 'axios';
import { FETCH_USER } from './types.js';

export const fetchUser = () => {
  //Redux Thunk middleware purpose is to see the return value of this action, it will see that
  //it is a function being returned and will automatically execute it for us and pass in that dispatch function as an argument
  return async function(dispatch) {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const handleToken = token => {
  return async function(dispatch) {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
    console.log(res);
  };
};
