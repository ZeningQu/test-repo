export interface Dashboard {
  activeDashboardID: number;
  list: DashboardState[];
}

export interface DashboardState {
  title: string;
  chartIDs: number[];
}

export const DEFAULT_DASHBOARD_STATE: DashboardState = {
  title: 'untitled dashboard',
  chartIDs: []
};

export const DEFAULT_ACTIVE_DASHBOARD_ID = 0;

export const DEFAULT_DASHBOARD: Dashboard = {
  activeDashboardID: DEFAULT_ACTIVE_DASHBOARD_ID,
  list: [DEFAULT_DASHBOARD_STATE]
};
