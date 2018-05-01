import { Action, MODE_SET } from '../actions';
import { Mode, DEFAULT_MODE } from '../models';

export function modeReducer(mode: Readonly<Mode> = DEFAULT_MODE, action: Action): Readonly<Mode> {
  switch (action.type) {
    case MODE_SET:
      return action.payload.mode;
    default:
      return mode;
  }
}
