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

            case type.GET_USE_INFO_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_USE_INFO_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }

            case type.GET_LIST_USER_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_LIST_USER_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }

            case type.USER_GET_LIST_BY_ID_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "USER_GET_LIST_BY_ID_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }


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


            case type.GET_USE_INFO_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_USE_INFO_RFAILURE",
                        errorMessesage: null,
                        listItem: action.payload
                  }




            case type.CHANGE_USE_PROPERTIES_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "CHANGE_USE_PROPERTIES_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }
            case type.CHANGE_USE_PROPERTIES_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "CHANGE_USE_PROPERTIES_RFAILURE",
                        errorMessesage: null,
                        listItem: action.payload
                  }


            case type.CREATE_USER_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "CREATE_USER_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }
            case type.CREATE_USER_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "CREATE_USER_RFAILURE",
                        errorMessesage: null,
                        listItem: action.payload
                  }


            case type.DELETE_USER_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "DELETE_USER_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }
            case type.DELETE_USER_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "DELETE_USER_RFAILURE",
                        errorMessesage: null,
                        listItem: action.payload
                  }



            case type.STATE_USER_TO_DEFAULT:
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