import Types from './actionTypes';

export const setIni = ini => ({ type: Types.SET_INI, ini });

export const setGameParams = params => ({ type: Types.SET_GAME_PARAMS, params });

export const increaseRewarded = initialize => ({ type: Types.INCREASE_REWARDED, initialize });
