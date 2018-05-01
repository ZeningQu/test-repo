import { combineReducers } from 'redux';
import undoable, { excludeAction, StateWithHistory } from 'redux-undo';

import { SET_APPLICATION_STATE, UNDO, REDO } from 'datavoyager/build/actions';
import { HISTORY_LIMIT } from 'datavoyager/build/constants';
import { makeResetReducer, ResetIndex } from 'datavoyager/build/reducers/reset';
import {
    persistentReducer as vyPersistentReducer,
    undoableReducerBase as vyUndoableReducerBase,
    undoableStateToReset as vyUndoableStateToReset,
    ACTIONS_EXCLUDED_FROM_HISTORY,
    USER_ACTION_INDEX
}
from 'datavoyager/build/reducers';

import { Action } from '../actions';
import { StoreState, UndoableStateBase, DEFAULT_STATE, DEFAULT_UNDOABLE_STATE_BASE } from '../models';
import { stateReducer } from './state';
import { consistencyReducer } from './consistency';
import { dashboardReducer } from './dashboard';
import { modeReducer } from './mode';

// copied from Voyager reducers/index
let _groupId = 0;
function getNextGroupId(): number {
  _groupId += 1;
  return _groupId;
}
function groupAction(action: Action, currentState: UndoableStateBase,
                     previousHistory: StateWithHistory<UndoableStateBase>): any {
    const currentActionType = action.type;

    if (USER_ACTION_INDEX[currentActionType]) {
        const nextGroupID = currentActionType + getNextGroupId();
        return nextGroupID;
    } else {
        const lastGroup = previousHistory.group;
        return lastGroup;
    }
}

const undoableStateToReset: ResetIndex<UndoableStateBase> = {
    ...vyUndoableStateToReset,
    consistency: true,
    dashboard: true,
    mode: true,
};

const undoableReducerBase = makeResetReducer(
    (state: UndoableStateBase = DEFAULT_UNDOABLE_STATE_BASE, action: Action): UndoableStateBase => {
        const {consistency, dashboard, mode, ...vyUndoableStateBase} = state;
        return {
            ...vyUndoableReducerBase(vyUndoableStateBase, action),
            consistency: consistencyReducer(consistency, action),
            dashboard: dashboardReducer(dashboard, action),
            mode: modeReducer(mode, action)
        };
    },
    undoableStateToReset,
    DEFAULT_UNDOABLE_STATE_BASE
);

const undoableReducer = undoable<UndoableStateBase>(undoableReducerBase, {
    limit: HISTORY_LIMIT,
    undoType: UNDO,
    redoType: REDO,
    groupBy: groupAction as any, // Typescript seems dumb about it
    filter: excludeAction(ACTIONS_EXCLUDED_FROM_HISTORY)
});

const rootBase = combineReducers<StoreState>({
    persistent: vyPersistentReducer,
    undoable: undoableReducer
});

export function reducer(state: StoreState = DEFAULT_STATE, action: Action): StoreState {
    if (action.type === SET_APPLICATION_STATE) {
        return stateReducer(state, action);
    } else {
        console.log('action: ', action, 'old state: ', state);
        const newState = rootBase(state, action);
        console.log('action: ', action, 'new state: ', newState);
        return newState;
    }
}

// import { ResultPlot } from 'datavoyager/build/models/result/plot';
// function printView(action: vyAction): void {
//     if (action.type === 'RESULT_RECEIVE') {
//         action.payload.plots.forEach((plot: ResultPlot) => {
//             console.log('spec: ' + JSON.stringify(plot.spec));
//         });
//     }
// }