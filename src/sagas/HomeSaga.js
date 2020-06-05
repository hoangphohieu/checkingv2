import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from '../fetchAPI/getByCustomAPI';
import getByCustomAPI2 from '../fetchAPI/getByCustomAPI2';
import PutItemAPI from '../fetchAPI/PutItemAPI';
import DeleteItemAPI from '../fetchAPI/DeleteItemAPI';
import PostItemAPI from '../fetchAPI/PostItemAPI';
import * as type from '../constants';
import _ from "lodash";

function* getChecking(param) {     // lấy total page

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


function* getCheckingDate(param) {     // lấy total page

    try {
        let res1 = yield getByCustomAPI(param.payload); //gọi API
        yield put({
            type: type.GET_CHECKING_DATE_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
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
    let api = "/zero";
    if (typePC === "led")
        api = "/pc_led"
    else if (typePC === "silicon")
        api = "/pc_silicon"
    else if (typePC === "glass" || typePC === "luminous")
        api = "/pc_gllm"

    try {
        let res1 = yield getByCustomAPI(api);
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
            payload: "?datatype=item&name=" + _.replace(param.payload.name, '#', '%23')
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
function* patchItem(param) {     // lấy total page
    console.log(param);

    try {
        let res1 = yield PutItemAPI(param.payload); //gọi API
        console.log(res1);

        yield put({
            type: type.GET_CHECKING_REQUEST, // trigger valueToGetAPIReducer , tính lại total Page
            payload: "?datatype=item&name=" + _.replace(res1.name, '#', '%23')
        })
    } catch (error) {
        yield put({
            type: type.PATCH_ITEM_CHECKING_PROPERTIES_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}

function* updatePCPro(param) {     // lấy total page
    // console.log(param);

    try {
        let res1 = yield PutItemAPI(param.payload); //gọi API
        // console.log(res1);

        yield put({
            type: type.ITEM_GET_PC_PRO_REQUEST, // trigger valueToGetAPIReducer , tính lại total Page
            payload: "?type=pc_properties"
        })
    } catch (error) {
        yield put({
            type: type.ITEM_UPDATE_PC_PRO_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}

function* getPCPro(param) {     // lấy total page
    // console.log("getPCPro",param);
    try {
        let res1 = yield getByCustomAPI(param.payload); //gọi API
        yield put({
            type: type.ITEM_GET_PC_PRO_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.ITEM_GET_PC_PRO_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}




export const HomeSaga = [
    takeEvery(type.GET_CHECKING_REQUEST, getChecking),
    takeEvery(type.GET_CHECKING_DATE_REQUEST, getCheckingDate),
    takeEvery(type.ITEMS_GET_SHEET_PC_REQUEST, getSheetPC),
    takeEvery(type.DELETE_ITEM_CHECKING_REQUEST, deleteItemChecking),
    takeEvery(type.PATCH_ITEM_CHECKING_PROPERTIES_REQUEST, patchItem),
    takeEvery(type.ITEMS_GET_PC_RETURN_REQUEST, getSheetPCReturn),
    takeEvery(type.ITEM_UPDATE_PC_PRO_REQUEST, updatePCPro),
    takeEvery(type.ITEM_GET_PC_PRO_REQUEST, getPCPro),

];   