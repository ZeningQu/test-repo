import { StateWithHistory } from 'redux-undo';

import {
    DEFAULT_PERSISTENT_STATE as VY_DEFAULT_PERSISTENT_STATE,
    DEFAULT_UNDOABLE_STATE_BASE as VY_DEFAULT_UNDOABLE_STATE_BASE,
    DEFAULT_VOYAGER_CONFIG as VY_DEFAULT_VOYAGER_CONFIG,
    GenericState,
    UndoableStateBase as VYUndoableStateBase
} from 'datavoyager/build/models';

import { Dashboard, DEFAULT_DASHBOARD } from './dashboard';
import { ConsistencyState, DEFAULT_CONSISTENCY_STATE } from './consistency';
import { Mode, DEFAULT_MODE } from './mode';

export * from './dashboard';
export * from './consistency';
export * from './mode';

export interface UndoableStateBase extends VYUndoableStateBase {
    consistency: ConsistencyState;
    dashboard: Dashboard;
    mode: Mode;
}

export type StoreState = GenericState<UndoableStateBase>;

export const DEFAULT_UNDOABLE_STATE_BASE: UndoableStateBase = {
    ...VY_DEFAULT_UNDOABLE_STATE_BASE,
    dashboard: DEFAULT_DASHBOARD,
    mode: DEFAULT_MODE,
    consistency: DEFAULT_CONSISTENCY_STATE
};

export const DEFAULT_UNDOABLE_STATE: StateWithHistory<UndoableStateBase> = {
    past: [],
    present: DEFAULT_UNDOABLE_STATE_BASE,
    future: [],
    _latestUnfiltered: null,
    group: null,
    index: null,
    limit: 30
};

export const DEFAULT_STATE: StoreState = {
    persistent: {
        ...VY_DEFAULT_PERSISTENT_STATE,
        config: {
            ...VY_DEFAULT_VOYAGER_CONFIG,
            hideHeader: true,
            relatedViews: 'disabled',
            wildcards: 'disabled',
        }
    },
    undoable: DEFAULT_UNDOABLE_STATE
};