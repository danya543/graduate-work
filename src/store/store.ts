import { StorageActionTypes } from '@src/types/Storage';
import { combineReducers, createStore, Store } from 'redux';

import storageReducer from './reducers/reducers';

const rootReducer = combineReducers({
  storage: storageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store: Store<RootState, StorageActionTypes> = createStore(rootReducer);

export default store;
