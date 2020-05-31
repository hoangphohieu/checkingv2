// file này để combine các reducer lại
import { combineReducers } from 'redux';

import ItemsReducer from './ItemsReducer';
import UploadReducer from './UploadReducer';
import HomeReducer from './HomeReducer';
import UseControl from './UsesReducer';
import ItemsApp from './AppReducer';
export default combineReducers({
      ItemExcelPost: UploadReducer,
      HomeReducer: HomeReducer,
      UseData: UseControl,
      itemsApp: ItemsApp,
      ItemsReducer: ItemsReducer,
}) 
