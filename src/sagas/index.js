// file này để combine các sagas lại 

import { all } from 'redux-saga/effects';
import { HomeSaga } from './HomeSaga';
import { AppSaga } from './AppSaga';
import { UploadSaga } from './UploadSaga';
import { UseSaga } from './UseSaga';
import { ItemsSaga } from './ItemsSaga';

function* rootsaga() {
    yield all([...HomeSaga, ...AppSaga, ...UploadSaga, ...UseSaga, ...ItemsSaga])
}
export default rootsaga;