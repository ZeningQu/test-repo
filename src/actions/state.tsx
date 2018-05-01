import { StoreState } from '../models';
import { ReduxAction } from 'datavoyager/build/actions/redux-action';

export type ApplicationStateAction = SetApplicationState;

export const SET_APPLICATION_STATE = 'SET_APPLICATION_STATE';
export type SetApplicationState = ReduxAction<typeof SET_APPLICATION_STATE, {
  state: Readonly<StoreState>
}>;
