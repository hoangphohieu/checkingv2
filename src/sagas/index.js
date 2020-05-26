// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { ItemSaga } from './ItemSaga';
import { HomeSaga } from './HomeSaga';
import { UploadSaga } from './UploadSaga';
import { UseSaga } from './UseSaga';
import { ControlItemsSaga } from './ControlItemsSaga';

function* rootsaga() {
    yield all([...ItemSaga, ...HomeSaga, ...UploadSaga, ...UseSaga, ...ControlItemsSaga])
}
export default rootsaga;