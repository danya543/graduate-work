import { combineReducers, createStore, Store } from 'redux';

import accReducer from './reducers/accReducer';
import commandReducer from './reducers/commandReducer';
import counterReducer from './reducers/counterReducer';
import r0Reducer from './reducers/r0Reducer';
import r1Reducer from './reducers/r1Reducer';
import r2Reducer from './reducers/r2Reducer';
import signalsReducer from './reducers/signalsReducer';
import storageReducer from './reducers/storageReducer';
import tempReducer from './reducers/tempReducer';
import { AppAction } from './types';

const rootReducer = combineReducers({
  signals: signalsReducer,
  storage: storageReducer,
  counter: counterReducer,
  acc: accReducer,
  temp: tempReducer,
  command: commandReducer,
  r0: r0Reducer,
  r1: r1Reducer,
  r2: r2Reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const store: Store<RootState, AppAction> = createStore(rootReducer);

export default store;
