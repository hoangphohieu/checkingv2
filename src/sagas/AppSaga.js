import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from '../fetchAPI/getByCustomAPI2';
import * as type from '../constants';

function* getSheetPC(param) {
      console.log(param);
      let typePC = param.payload;
      let api = type.SHEET_BEST_PC;
      if (typePC === "led")
            api = type.SHEET_BEST_PC_LED
      else if (typePC === "silicon")
            api = type.SHEET_BEST_PC_SILICON

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


export const AppSaga = [

      takeEvery(type.GET_SHEET_PHONE_REQUEST, getSheetPC),

];   