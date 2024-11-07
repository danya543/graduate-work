import SessionStorageService from '@applicationStorage/SessionStorage';
import { CounterActionTypes, INCREMENT, RESET } from '@store/types';

const initialCounter: number = SessionStorageService.loadCounter() ?? 0;

const counterReducer = (
  state: number = initialCounter,
  action: CounterActionTypes,
): number => {
  let newCounter: number;
  switch (action.type) {
    case INCREMENT:
      newCounter = state + 1;
      SessionStorageService.saveCounter(newCounter);
      return newCounter;
    case RESET:
      newCounter = 0;
      SessionStorageService.saveCounter(newCounter);
      return newCounter;
    default:
      return state;
  }
};

export default counterReducer;
