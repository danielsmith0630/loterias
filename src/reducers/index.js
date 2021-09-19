import { combineReducers } from 'redux-immutable';
import global from './global';

const applicationReducers = {
  global
};

export default function createReducer() {
  return combineReducers(applicationReducers);
}
