import * as type from './../constants';

export function getCheckingAPI(payload) {
    return ({ type: type.GET_CHECKING_REQUEST, payload })
}


export function getCheckingControlItem(payload) {
    return ({ type: type.GET_CI_CHECKING_REQUEST, payload })
}

export function patchItem_ControlItems(payload) {
    return ({ type: type.CI_PATCH_ITEMS_REQUEST, payload })
}
export function CI_deleteItem(payload) {
    return ({ type: type.CI_DELETE_ITEMS_REQUEST, payload })
}


export function postItemAPI(payload) {
    return ({ type: type.POST_ITEM_EXCEL_REQUEST, payload })
}
export function getSheetPhone(payload) {
    return ({ type: type.GET_SHEET_PHONE_REQUEST, payload })
}

export function patchItemsExcelFailAPI(payload) {
    return ({ type: type.PATCH_ITEM_EXCEL_FAIL_REQUEST, payload })
}

export function changePrintStatusAPI(payload) {
    return ({ type: type.CHANGE_PRINT_STATUS_REQUEST, payload })
}

export function patchItemCheckingProperties(payload) {
    console.log(payload);

    return ({ type: type.PATCH_ITEM_CHECKING_PROPERTIES_REQUEST, payload })
}

export function deleteItemChecking(payload) {
    return ({ type: type.DELETE_ITEM_CHECKING_REQUEST, payload })
}

export function ItemGetSheetPhone(payload) {
    return ({ type: type.ITEMS_GET_SHEET_PC_REQUEST, payload })
}

export function ItemGetPCReturn(payload) {
    return ({ type: type.ITEMS_GET_PC_RETURN_REQUEST, payload })
}


export function itemPostItem(payload) {
    return ({ type: type.ITEM_POST_ITEM_REQUEST, payload })
}
export function propsItemsToDefault(payload) {
    return ({ type: type.PROPS_ITEMS_TO_DEFAULT, payload })
}
export function propsControlItemsToDefault(payload) {
    return ({ type: type.PROPS_CONTROL_ITEMS_TO_DEFAULT, payload })
}
export function getLastitem(payload) {
    return ({ type: type.GET_LAST_ITEM_REQUEST, payload })
}


export function getListById(payload) {
    return ({ type: type.GET_LIST_BY_ID_REQUEST, payload })
}


export function stateImportExcelToDefault() {

    return ({ type: type.STATE_POST_TO_DEFAULT })
}

export function postListItemCountAPI(payload) {
    return ({ type: type.POST_LIST_ITEM_COUNT_REQUEST, payload })
}

export function patchListItemCountAPI(payload) {
    return ({ type: type.PATCH_LIST_ITEM_COUNT_REQUEST, payload })
}

export function postListItemCountPatchFailAPI(payload) {
    return ({ type: type.POST_LIST_ITEM_COUNT_PATCH_FAIL_REQUEST, payload })
}
export function getLastItemOflistItemCountPatch(payload) {
    return ({ type: type.GET_LAST_ITEM_OF_LIST_ITEM_COUNT_REQUEST, payload })
}

export function patchItemItemAPI(payload) {
    return ({ type: type.PATCH_ITEM_TRACKING_CONTROL_REQUEST, payload })
}
export function getItemTrackingFailAPI(payload) {
    return ({ type: type.GET_ITEM_TRACKING_FAIL_REQUEST, payload })
}

export function postListTrackingCountAPI(payload) {
    return ({ type: type.POST_LIST_TRACKING_COUNT_REQUEST, payload })
}
export function getTrackingAPI(payload) {
    return ({ type: type.GET_TRACKING_REQUEST, payload })
}
export function getTrackingMore(payload) {
    return ({ type: type.GET_TRACKING_MORE_REQUEST, payload })
}

export function setStateStoreToDefault() {
    return ({ type: type.SET_STATE_STORE_TO_DEFAULT })
}

export function SearchOneTrackingAPI(payload) {
    return ({ type: type.GET_ONE_TRACKING_REQUEST, payload })
}

export function getUseAPI(payload) {
    return ({ type: type.GET_USE_INFO_REQUEST, payload })
}

export function setStateUserToDefault() {
    return ({ type: type.STATE_USER_TO_DEFAULT })
}

export function getListUserAPI(payload) {
    return ({ type: type.GET_LIST_USER_REQUEST, payload })
}

export function userGetListById(payload) {
    return ({ type: type.USER_GET_LIST_BY_ID_REQUEST, payload })
}

export function changeUserPropertiesAPI(payload) {
    return ({ type: type.CHANGE_USE_PROPERTIES_REQUEST, payload })
}

export function createUser(payload) {
    return ({ type: type.CREATE_USER_REQUEST, payload })
}

export function deleteUser(payload) {
    return ({ type: type.DELETE_USER_REQUEST, payload })
}
export function ExcelGetListPartner(payload) {
    return ({ type: type.EXCEL_GET_LIST_BY_ID_REQUEST, payload })
}


export function getOrderByDay(payload) {
    return ({ type: type.GET_ORDER_BY_DAY_REQUEST, payload })
}
export function StateStoreTrackingToDefault() {
    return ({ type: type.STATE_STORE_TRACKING_TO_DEFAULT })
}

export function putUser(payload) {
    return ({ type: type.PUT_USER_REQUEST, payload })
}


export function getSumItem(payload) {
    // console.log(payload);

    return ({ type: type.GET_SUM_ITEM_REQUEST, payload })
}
export function stateStoreHomeToDefault() {
    return ({ type: type.STATE_STORE_HOME_TO_DEFAULT })
}
