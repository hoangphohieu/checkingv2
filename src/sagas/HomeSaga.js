import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from '../fetchAPI/getByCustomAPI';
import * as type from '../constants';

function* getSumItem(param) {
      try {
            let res1 = yield getByCustomAPI(param.payload); 
            yield put({
                  type: type.GET_SUM_ITEM_SUCSESS, 
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_HOME_RFAILURE,
                  payload: {
                        errorMessage: error.Message
                  }
            })
      }
}


export const HomeSaga = [

      takeEvery(type.GET_SUM_ITEM_REQUEST, getSumItem),

];   