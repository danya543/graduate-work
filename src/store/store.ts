import { combineReducers, createStore, Store } from 'redux';

import accReducer from './reducers/accReducer';
import commandReducer from './reducers/commandReducer';
import counterReducer from './reducers/counterReducer';
import storageReducer from './reducers/storageReducer';
import tempReducer from './reducers/tempReducer';
import { AppAction } from './types';

const rootReducer = combineReducers({
  storage: storageReducer,
  counter: counterReducer,
  acc: accReducer,
  temp: tempReducer,
  command: commandReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store: Store<RootState, AppAction> = createStore(rootReducer);

export default store;
