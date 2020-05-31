import * as type from '../constants';
let DEFAULT_STATE = {
    listItem: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    errorMessesage: null,
    type: "PROPS_ITEMS_TO_DEFAULT"
}
export default (state = DEFAULT_STATE, action) => {
    // console.log(action);

    switch (action.type) {

        // get page items
        case type.GET_CHECKING_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload,
                type: "GET_CHECKING_SUCSESS"
            }
        case type.GET_CHECKING_DATE_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload,
                type: "GET_CHECKING_DATE_SUCSESS"
            }

        case type.PROPS_ITEMS_TO_DEFAULT:

            return {
                listItem: [],
                dataFetched: false,
                isFetching: false,
                error: false,
                errorMessesage: null,
                type: "PROPS_ITEMS_TO_DEFAULT"
            }


        case type.ITEMS_GET_SHEET_PC_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload,
                type: "ITEMS_GET_SHEET_PC_SUCSESS"
            }

        case type.ITEMS_GET_SHEET_PC_RFAILURE:

            return {
                listItem: [],
                dataFetched: false,
                isFetching: false,
                error: false,
                errorMessesage: null,
                type: "ITEMS_GET_SHEET_PC_RFAILURE"
            }


        case type.ITEMS_GET_PC_RETURN_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload,
                type: "ITEMS_GET_PC_RETURN_SUCSESS"
            }

        case type.ITEMS_GET_PC_RETURN_RFAILURE:

            return {
                listItem: [],
                dataFetched: false,
                isFetching: false,
                error: false,
                errorMessesage: null,
                type: "ITEMS_GET_PC_RETURN_RFAILURE"
            }



        case type.GET_CHECKING_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessesage: action.payload.errorMessesage,
                type: "GET_CHECKING_RFAILURE"

            }



        case type.ITEM_UPDATE_PC_PRO_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessesage: action.payload.errorMessesage,
                type: "ITEM_UPDATE_PC_PRO_RFAILURE"

            }



        case type.ITEM_GET_PC_PRO_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessesage: action.payload.errorMessesage,
                type: "ITEM_GET_PC_PRO_RFAILURE"

            }


        case type.ITEM_GET_PC_PRO_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload,
                type: "ITEM_GET_PC_PRO_SUCSESS"
            }
        default:
            return state;
    }
}