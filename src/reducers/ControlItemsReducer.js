import * as type from './../constants';
let DEFAULT_STATE = {
    listItem: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    errorMessesage: null,
    type: "PROPS_CONTROL_ITEMS_TO_DEFAULT"
}
export default (state = DEFAULT_STATE, action) => {
    // console.log(action);

    switch (action.type) {

        // get page items
        case type.GET_CI_CHECKING_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload,
                type: "GET_CI_CHECKING_SUCSESS"
            }

        case type.GET_CHECKING_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessesage: action.payload.errorMessesage,
                type: "GET_CI_CHECKING_RFAILURE"

            }


        case type.CI_PATCH_ITEMS_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload,
                type: "CI_PATCH_ITEMS_SUCSESS"
            }

        case type.CI_PATCH_ITEMS_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessesage: action.payload.errorMessesage,
                type: "CI_PATCH_ITEMS_RFAILURE"

            }


        case type.CI_DELETE_ITEMS_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload,
                type: "CI_DELETE_ITEMS_SUCSESS"
            }

        case type.CI_DELETE_ITEMS_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessesage: action.payload.errorMessesage,
                type: "CI_DELETE_ITEMS_RFAILURE"

            }


        case type.PROPS_CONTROL_ITEMS_TO_DEFAULT:

            return {
                listItem: [],
                dataFetched: false,
                isFetching: false,
                error: false,
                errorMessesage: null,
                type: "PROPS_CONTROL_ITEMS_TO_DEFAULT"
            }



        default:
            return state;
    }
}