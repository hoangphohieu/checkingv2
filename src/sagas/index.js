// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { ItemSaga } from './ItemSaga';
import { HomeSaga } from './HomeSaga';
import { UploadSaga } from './UploadSaga';
import { UseSaga } from './UseSaga';

function* rootsaga() {
    yield all([...ItemSaga, ...HomeSaga, ...UploadSaga, ...UseSaga])
}
export default rootsaga;