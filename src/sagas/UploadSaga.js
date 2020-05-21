import { put, takeEvery } from 'redux-saga/effects';
import PostItemAPI from '../fetchAPI/PostItemAPI';
import PutItemAPI from '../fetchAPI/PutItemAPI';
import getListByCustomAPI from '../fetchAPI/getByCustomAPI';

import * as type from '../constants';

function* postItemExcel(param) {     // lấy total page
      try {
            let res1 = yield PostItemAPI(param.payload); //gọi API
            yield put({
                  type: type.POST_ITEM_EXCEL_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.POST_ITEM_EXCEL_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }

}
// function* postItemExcel(param) {     // lấy total page
//       try {
//             let res1 = yield postItemExcel(param.payload); //gọi API
//             yield put({
//                   type: type.POST_ITEM_EXCEL_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
//                   payload: res1
//             })
//       } catch (error) {
//             yield put({
//                   type: type.POST_ITEM_EXCEL_RFAILURE, // trigger itemsReducer
//                   payload: {
//                         errorMessage: error
//                   }
//             })
//       }
// }


function* excelGetListById(param) {     // lấy total page
      try {
            let res1 = yield getListByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.EXCEL_GET_LIST_BY_ID_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
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

function* putUser(param) {     // lấy total page
      try {
            let res1 = yield PutItemAPI(param.payload); //gọi API
            yield put({
                  type: type.PUT_USER_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.PUT_USER_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}




export const UploadSaga = [
      takeEvery(type.POST_ITEM_EXCEL_REQUEST, postItemExcel),
      // takeEvery(type.PATCH_ITEM_EXCEL_FAIL_REQUEST, PutItemAPI),
      takeEvery(type.EXCEL_GET_LIST_BY_ID_REQUEST, excelGetListById),
      takeEvery(type.PUT_USER_REQUEST, putUser),


];   