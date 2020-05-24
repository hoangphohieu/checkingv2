// file này để combine các reducer lại
import { combineReducers } from 'redux';
import ItemReducer from './ItemReducer';
import UploadReducer from './UploadReducer';
import ItemsPartner from './HomeReducer';
import UseControl from './UsesReducer';
import ItemsApp from './AppReducer';
export default combineReducers({
      items: ItemReducer,
      ItemExcelPost: UploadReducer,
      itemsPartner: ItemsPartner,
      UseData: UseControl,
      itemsApp: ItemsApp
})
