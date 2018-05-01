import { StoreState, ConsistencyState } from '../models';

export const selectConsistencyState = (state: StoreState): ConsistencyState => state.undoable.present.consistency;
