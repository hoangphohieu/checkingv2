import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from '../fetchAPI/getByCustomAPI';
import * as type from '../constants';

function* getSheetPC(param) {
      try {
            let res1 = yield getByCustomAPI("?type=pc_properties");
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