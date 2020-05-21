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
      console.log(action);
      switch (action.type) {

            case type.GET_ORDER_BY_DAY_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_ORDER_BY_DAY_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }

            case type.GET_TRACKING_MORE_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_TRACKING_MORE_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }




            case type.GET_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_RFAILURE",
                        errorMessesage: null,
                        listItem: action.payload
                  }
            case type.STATE_STORE_TRACKING_TO_DEFAULT:
                  return {
                        ...state,
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