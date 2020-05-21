import * as type from '../constants';
let DEFAULT_STATE = {
    listItem: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    type: "STATE_TO_DEFAULT",
    errorMessesage: null
}
export default (state = DEFAULT_STATE, action) => {
    // console.log(action);

    switch (action.type) {

        case type.STATE_POST_TO_DEFAULT:
            return {
                listItem: [],
                dataFetched: false,
                isFetching: false,
                error: false,
                type: "STATE_POST_TO_DEFAULT",
                errorMessesage: null
            }

        case type.POST_ITEM_EXCEL_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "POST_ITEM_EXCEL_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.POST_ITEM_EXCEL_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "POST_ITEM_EXCEL_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }

            case type.GET_LAST_ITEM_SUCSESS:
                return {
                    ...state,
                    isFetching: false,
                    dataFetched: true,
                    error: false,
                    type: "GET_LAST_ITEM_SUCSESS",
                    errorMessesage: null,
                    listItem: action.payload
                }
    


     

        // 
        case type.EXCEL_GET_LIST_BY_ID_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "EXCEL_GET_LIST_BY_ID_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.GET_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "GET_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }

            // 

            case type.PUT_USER_SUCSESS:

                return {
                    ...state,
                    isFetching: false,
                    dataFetched: true,
                    error: false,
                    type: "PUT_USER_SUCSESS",
                    errorMessesage: null,
                    listItem: action.payload
                }
    
            case type.PUT_USER_RFAILURE:
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    type: "PUT_USER_RFAILURE",
                    dataFetched: false,
                    errorMessesage: action.payload.errorMessesage
                }
    

            





        default:
            return state;
    }
}