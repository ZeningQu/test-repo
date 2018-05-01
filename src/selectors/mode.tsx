import { StoreState, Mode } from '../models';

export const selectMode = (state: StoreState): Mode => state.undoable.present.mode;