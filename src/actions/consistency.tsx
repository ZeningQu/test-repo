import { PlainReduxAction, ReduxAction } from 'datavoyager/build/actions/redux-action';

import { ConsistencyVariables, Warning, Highlight } from '../models';

export type ConsistencyAction = (
  ConsistencyClear |
  ConsistencyDataUpdate |
  ConsistencyWarningsUpdate |
  ConsistencyHighlightsShow |
  ConsistencyHighlightsClear
);

export const CONSISTENCY_CLEAR = 'CONSISTENCY_CLEAR';
export type ConsistencyClear = PlainReduxAction<typeof CONSISTENCY_CLEAR>;

export const CONSISTENCY_DATA_UPDATE = 'CONSISTENCY_DATA_UPDATE';
export type ConsistencyDataUpdate = ReduxAction<typeof CONSISTENCY_DATA_UPDATE, {
  chartID: number;
  chartTitle: string;
  consistencyVariables: ConsistencyVariables;
}>;

export const CONSISTENCY_WARNINGS_UPDATE = 'CONSISTENCY_WARNINGS_UPDATE';
export type ConsistencyWarningsUpdate = ReduxAction<typeof CONSISTENCY_WARNINGS_UPDATE, {
  warnings: Warning[];
}>;

export const CONSISTENCY_HIGHLIGHTS_SHOW = 'CONSISTENCY_HIGHLIGHTS_SHOW';
export type ConsistencyHighlightsShow = ReduxAction<typeof CONSISTENCY_HIGHLIGHTS_SHOW, {
  highlights: Highlight[]
}>;

export const CONSISTENCY_HIGHLIGHTS_CLEAR = 'CONSISTENCY_HIGHLIGHTS_CLEAR';
export type ConsistencyHighlightsClear = PlainReduxAction<typeof CONSISTENCY_HIGHLIGHTS_CLEAR>;