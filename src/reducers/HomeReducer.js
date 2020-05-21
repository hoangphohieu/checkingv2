import * as type from './../constants';
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

            case type.GET_SUM_ITEM_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_SUM_ITEM_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }

            case type.GET_HOME_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_HOME_RFAILURE",
                        errorMessesage: null,
                        listItem: action.payload
                  }
                  case type.STATE_STORE_HOME_TO_DEFAULT:
                        return {
                              listItem: [],
                              dataFetched: false,
                              isFetching: false,
                              error: false,
                              type: "STATE_TO_DEFAULT",
                              errorMessesage: null
                        }
      
     
                  
            default:
                  return state;
      }
}