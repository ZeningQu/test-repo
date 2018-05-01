import { ConsistencyVariables } from './consistency-variables';

export * from './consistency-variables';

export interface Warning {
  msg: string;
  highlights: Highlight[];
}

export interface Bound {
  top: number;
  left: number;
  width: number;
  height: number;
}

// override default highlight padding, border etc
export interface Highlight extends Bound {
  padding?: number;
  borderWidth?: number;
  borderRadius?: number;
}

export interface ConsistencyDataState {
  chartIDs: number[];
  chartTitles: string[];
  consistencyVariables: ConsistencyVariables[];
}

export interface ConsistencyState extends ConsistencyDataState {
  warnings: Warning[];
  activeHighlights: Highlight[];
}

export const DEFAULT_ACTIVE_HIGHLIGHTS: Highlight[] = [];

export const DEFAULT_CONSISTENCY_STATE: ConsistencyState = {
  chartIDs: [],
  chartTitles: [],
  consistencyVariables: [],
  warnings: [],
  activeHighlights: DEFAULT_ACTIVE_HIGHLIGHTS
};
