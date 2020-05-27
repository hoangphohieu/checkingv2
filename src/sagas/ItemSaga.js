import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from '../fetchAPI/getByCustomAPI';
import getByCustomAPI2 from '../fetchAPI/getByCustomAPI2';

import DeleteItemAPI from '../fetchAPI/DeleteItemAPI';
import PostItemAPI from '../fetchAPI/PostItemAPI';
import * as type from '../constants';
import _ from "lodash";

function* getChecking(param) {     // lấy total page
    console.log(param);
    try {
        let res1 = yield getByCustomAPI(param.payload); //gọi API
        yield put({
            type: type.GET_CHECKING_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.GET_CHECKING_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}

function* getSheetPC(param) {
    // console.log(param);
    let typePC = param.payload;
    let api = type.SHEET_BEST_PC;
    if (typePC === "led")
        api = type.SHEET_BEST_PC_LED
    else if (typePC === "silicon")
        api = type.SHEET_BEST_PC_SILICON

    try {
        let res1 = yield getByCustomAPI2(api);
        yield put({
            type: type.ITEMS_GET_SHEET_PC_SUCSESS,
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.ITEMS_GET_SHEET_PC_RFAILURE,
            payload: {
                errorMessage: error.Message
            }
        })
    }
}




function* deleteItemChecking(param) {     // lấy total page
    console.log(param);

    try {
        let res1 = yield DeleteItemAPI(param.payload); //gọi API

        yield put({
            type: type.GET_CHECKING_REQUEST, // trigger valueToGetAPIReducer , tính lại total Page
            payload: "?datatype=item&name=" + _.replace(res1.item_post.name, '#', '%23')
        })
    } catch (error) {
        yield put({
            type: type.GET_CHECKING_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}


function* getSheetPCReturn(param) {
    // console.log(param);
    let typePC = param.payload;
    let api = type.SHEET_BEST_PC_GLLM_RETURN;

    try {
        let res1 = yield getByCustomAPI2(api);
        yield put({
            type: type.ITEMS_GET_PC_RETURN_SUCSESS,
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.ITEMS_GET_PC_RETURN_RFAILURE,
            payload: {
                errorMessage: error.Message
            }
        })
    }
}



export const ItemSaga = [
    takeEvery(type.GET_CHECKING_REQUEST, getChecking),
    takeEvery(type.ITEMS_GET_SHEET_PC_REQUEST, getSheetPC),
    takeEvery(type.DELETE_ITEM_CHECKING_REQUEST, deleteItemChecking),

    takeEvery(type.ITEMS_GET_PC_RETURN_REQUEST, getSheetPCReturn),

];   