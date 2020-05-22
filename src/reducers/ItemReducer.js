import * as type from './../constants';
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

        case type.PROPS_ITEMS_TO_DEFAULT:

            return {
                listItem: [],
                dataFetched: false,
                isFetching: false,
                error: false,
                errorMessesage: null,
                type: "PROPS_ITEMS_TO_DEFAULT"
            }


        case type.GET_CHECKING_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessesage: action.payload.errorMessesage,
                type: "GET_CHECKING_RFAILURE"

            }

        default:
            return state;
    }
}