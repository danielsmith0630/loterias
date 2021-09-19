import { applyMiddleware, createStore } from 'redux';
import { fromJS } from 'immutable';
import devTools from 'remote-redux-devtools';

import createReducer from './reducers';

function configureStore(initialState = fromJS({})) {
  const middlewares = [];
  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  if (__DEV__) {
    enhancers.push(devTools());
  }
  const store = createStore(
    createReducer(),
    initialState,
  );
  return store;
}

module.exports = configureStore;
