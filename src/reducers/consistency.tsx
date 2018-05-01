import { ConsistencyState, DEFAULT_CONSISTENCY_STATE } from '../models/index';
import { Action } from '../actions';

export function consistencyReducer(consistency: ConsistencyState = DEFAULT_CONSISTENCY_STATE, action: Action)
: ConsistencyState {
  return consistency;
}
