import SessionStorageService from '@applicationStorage/SessionStorage';
import {
  CommandActionTypes,
  CommandPayload,
  RESET_COMMAND,
  SET_COMMAND,
} from '@store/types';

const initialCommand: CommandPayload = SessionStorageService.loadCommand() ?? {
  firstValue: 0,
  secondValue: 0,
};

const commandReducer = (
  state: CommandPayload = initialCommand,
  action: CommandActionTypes,
): CommandPayload => {
  let newState: { firstValue: number; secondValue: number };
  switch (action.type) {
    case SET_COMMAND:
      newState = {
        firstValue: action.payload.newFirstValue,
        secondValue: action.payload.newSecondValue,
      };
      SessionStorageService.saveCommand(newState);
      return newState;
    case RESET_COMMAND:
      newState = {
        firstValue: 0,
        secondValue: 0,
      };
      SessionStorageService.saveCommand(newState);
      return newState;
    default:
      return state;
  }
};

export default commandReducer;
