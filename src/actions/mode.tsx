import { ReduxAction } from 'datavoyager/build/actions/redux-action';
import { Mode } from '../models';

export type ModeAction = ModeSet;

export const MODE_SET = 'MODE_SET';
export type ModeSet = ReduxAction<typeof MODE_SET, {
  mode: Mode;
}>;