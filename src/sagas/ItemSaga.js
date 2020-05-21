import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from '../fetchAPI/getByCustomAPI';
import PutItemAPI from '../fetchAPI/PutItemAPI';
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
function* patchPrintStatusItem(param) {     // lấy total page
    console.log(param);

    try {
        let res1 = yield PutItemAPI(param.payload); //gọi API
        console.log(res1);

        yield put({
            type: type.GET_CHECKING_REQUEST, // trigger valueToGetAPIReducer , tính lại total Page
            payload: "?datatype=item&name=" + _.replace(res1.item_post.name, '#', '%23')
        })
    } catch (error) {
        yield put({
            type: type.CHANGE_PRINT_STATUS_RFAILURE, // trigger itemsReducer
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


function* postItem(param) {     // lấy total page
    console.log(param);

    try {
        let res1 = yield PostItemAPI(param.payload); //gọi API

        yield put({
            type: type.GET_CHECKING_REQUEST, // trigger valueToGetAPIReducer , tính lại total Page
            payload: "?datatype=item&name=" + _.replace(res1.item_post.name, '#', '%23')
        })
    } catch (error) {
        yield put({
            type: type.ITEM_POST_ITEM_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}
export const ItemSaga = [
    takeEvery(type.GET_CHECKING_REQUEST, getChecking),
    takeEvery(type.CHANGE_PRINT_STATUS_REQUEST, patchPrintStatusItem),
    takeEvery(type.DELETE_ITEM_CHECKING_REQUEST, deleteItemChecking),
    takeEvery(type.PATCH_ITEM_CHECKING_PROPERTIES_REQUEST, patchPrintStatusItem),

    takeEvery(type.ITEM_POST_ITEM_REQUEST, postItem),

];   