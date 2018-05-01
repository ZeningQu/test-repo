export type Mode = ModeChart | ModeDashboard;

export const MODE_CHART = 'MODE_CHART';
export type ModeChart = typeof MODE_CHART;

export const MODE_DASHBOARD = 'MODE_DASHBOARD';
export type ModeDashboard = typeof MODE_DASHBOARD;

export const DEFAULT_MODE: Mode = MODE_CHART;
