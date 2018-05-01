import { PlainReduxAction, ReduxAction } from 'datavoyager/build/actions/redux-action';

export type DashboardAction = (
  DashboardAdd |
  DashboardRemove |
  DashboardSwitch |
  DashboardTitleUpdate |
  DashboardAddChart |
  DashboardRemoveChart |
  DashboardRemoveChartInAll
);

// dashboard alone
export const DASHBOARD_ADD = 'DASHBOARD_ADD';
export type DashboardAdd = PlainReduxAction<typeof DASHBOARD_ADD>;

export const DASHBOARD_REMOVE = 'DASHBOARD_REMOVE';
export type DashboardRemove = PlainReduxAction<typeof DASHBOARD_REMOVE>;

export const DASHBOARD_SWITCH = 'DASHBOARD_SWITCH';
export type DashboardSwitch = ReduxAction<typeof DASHBOARD_SWITCH, {
  switchToDashboard: number;
}>;

export const DASHBOARD_TITLE_UPDATE = 'DASHBOARD_TITLE_UPDATE';
export type DashboardTitleUpdate = ReduxAction<typeof DASHBOARD_TITLE_UPDATE, {
  title: string;
}>;

// dashboard and chart
export const DASHBOARD_ADD_CHART = 'DASHBOARD_ADD_CHART';
export type DashboardAddChart = ReduxAction<typeof DASHBOARD_ADD_CHART, {
  chartID: number;
}>;

export const DASHBOARD_REMOVE_CHART = 'DASHBOARD_REMOVE_CHART';
export type DashboardRemoveChart = ReduxAction<typeof DASHBOARD_REMOVE_CHART, {
  chartID: number;
}>;

export const DASHBOARD_REMOVE_CHART_IN_ALL = 'DASHBOARD_REMOVE_CHART_IN_ALL';
export type DashboardRemoveChartInAll = ReduxAction<typeof DASHBOARD_REMOVE_CHART_IN_ALL, {
  chartID: number;
}>;