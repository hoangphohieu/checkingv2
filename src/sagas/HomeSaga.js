import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from '../fetchAPI/getByCustomAPI2';
import * as type from '../constants';

function* getSumItem() {
      let api = type.SHEET_BEST_PC;
      try {
            let res1 = yield getByCustomAPI(api);
            yield put({
                  type: type.GET_SHEET_PHONE_SUCSESS,
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_SHEET_PHONE_RFAILURE,
                  payload: {
                        errorMessage: error.Message
                  }
            })
      }
}


export const HomeSaga = [

      takeEvery(type.GET_SHEET_PHONE_REQUEST, getSumItem),

];   