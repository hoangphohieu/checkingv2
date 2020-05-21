import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from './../fetchAPI/getByCustomAPI';
import PutItemAPI from './../fetchAPI/PutItemAPI';
import PostItemAPI from './../fetchAPI/PostItemAPI';
import DeleteItemAPI from '../fetchAPI/DeleteItemAPI';


import * as type from './../constants';

function* getUseInfo(param) {     // lấy total page      
      try {
            let res1 = yield getByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_USE_INFO_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_USE_INFO_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

function* getListUser(param) {     // lấy total page      
      try {
            let res1 = yield getByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.GET_LIST_USER_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_USE_INFO_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

function* userGetListById(param) {     // lấy total page      
      try {
            let res1 = yield getByCustomAPI(param.payload); //gọi API
            yield put({
                  type: type.USER_GET_LIST_BY_ID_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_USE_INFO_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}


function* changeUserProperties(param) {     // lấy total page      
      try {
            let res1 = yield PutItemAPI(param.payload); //gọi API
            yield put({
                  type: type.CHANGE_USE_PROPERTIES_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.CHANGE_USE_PROPERTIES_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}


function* createUser(param) {     // lấy total page      
      try {
            let res1 = yield PostItemAPI(param.payload); //gọi API
            yield put({
                  type: type.CREATE_USER_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.CREATE_USER_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

function* deleteUser(param) {     // lấy total page      
      try {
            let res1 = yield DeleteItemAPI(param.payload); //gọi API
            yield put({
                  type: type.DELETE_USER_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.DELETE_USER_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}
export const UseSaga = [
      takeEvery(type.GET_USE_INFO_REQUEST, getUseInfo),
      takeEvery(type.GET_LIST_USER_REQUEST, getListUser),
      takeEvery(type.USER_GET_LIST_BY_ID_REQUEST, userGetListById),
      takeEvery(type.CHANGE_USE_PROPERTIES_REQUEST, changeUserProperties),
      takeEvery(type.CREATE_USER_REQUEST, createUser),
      takeEvery(type.DELETE_USER_REQUEST, deleteUser),





];   