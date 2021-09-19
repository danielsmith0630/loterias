import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import Types from '../actions/actionTypes';

// import I18n from 'react-native-i18n';
// import _ from 'lodash';

export const initialState = Immutable({
  ini: null,
  rewardedCount: 0
});

const setIni = (state, action) => ({
  ...state,
  ini: action.ini
});


const increaseRewarded = (state, action) => ({
  ...state,
  rewardedCount: action.initialize ? 0 : state.rewardedCount + 1
});

const actionHandlers = {
  [Types.SET_INI]: setIni,
  [Types.INCREASE_REWARDED]: increaseRewarded
};

export default createReducer(initialState, actionHandlers);
