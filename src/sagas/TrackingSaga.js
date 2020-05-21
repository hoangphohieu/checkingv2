import { put, takeEvery } from 'redux-saga/effects';
import getListByCustomAPI from '../fetchAPI/getByCustomAPI';
import GetTrackingAPI from './../fetchAPI/GetTrackingAPI';
import * as type from './../constants';




function* getOrderByDay(param) {     // lấy total page
      try {
            let res1 = yield getListByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_ORDER_BY_DAY_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}


function* getTrackingMore(param) {     // lấy total page
      try {
            let res1 = yield GetTrackingAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_TRACKING_MORE_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}




export const TrackingSaga = [
      takeEvery(type.GET_ORDER_BY_DAY_REQUEST, getOrderByDay),
      takeEvery(type.GET_TRACKING_MORE_REQUEST, getTrackingMore),
      





];   