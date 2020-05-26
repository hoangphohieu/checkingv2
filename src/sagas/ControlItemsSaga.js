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
            type: type.GET_CI_CHECKING_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.GET_CI_CHECKING_RFAILURE, // trigger itemsReducer
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
            type: type.CI_PATCH_ITEMS_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.CI_PATCH_ITEMS_RFAILURE, // trigger itemsReducer
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
export const ControlItemsSaga = [
    takeEvery(type.GET_CI_CHECKING_REQUEST, getChecking), // da su dung
    takeEvery(type.DELETE_ITEM_CHECKING_REQUEST, deleteItemChecking),
    takeEvery(type.CI_PATCH_ITEMS_REQUEST, patchItem), // da su dung

    takeEvery(type.ITEM_POST_ITEM_REQUEST, postItem),

];   