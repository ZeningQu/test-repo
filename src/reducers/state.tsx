import { Action } from '../actions';
import { StoreState, DEFAULT_STATE } from '../models';
import { SET_APPLICATION_STATE } from '../actions';
// import { stateReducer as vyStateReducer } from 'datavoyager/build/reducers/state';

export function stateReducer(state: Readonly<StoreState> = DEFAULT_STATE, action: Action): Readonly<StoreState> {
  switch (action.type) {
    case SET_APPLICATION_STATE:
      return action.payload.state;
    default:
      return state;
  }
}