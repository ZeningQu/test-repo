import {
  DASHBOARD_REMOVE_CHART_IN_ALL,
  DASHBOARD_REMOVE_CHART
} from '../actions';
import { Dashboard } from '../models';
import { dashboardReducer } from './dashboard';

describe('reducers/dashboard', () => {
  describe(DASHBOARD_REMOVE_CHART_IN_ALL, () => {
    it('should remove chartID, and re-calculate chartIDs after the chart, in all dashboards', () => {
      const oldDashboardState: Dashboard = {
        activeDashboardID: 0,
        list: [
          {title: 'db 0', chartIDs: [0, 1, 2, 3]},
          {title: 'db 1', chartIDs: [1, 3, 4]},
          {title: 'db 2', chartIDs: [5, 6]}]
      };
      const newDashboardState = dashboardReducer(
        oldDashboardState,
        {type: 'DASHBOARD_REMOVE_CHART_IN_ALL', payload: {chartID: 1}});
      expect(newDashboardState.list).toEqual(
        [
          {title: 'db 0', chartIDs: [0, 1, 2]},
          {title: 'db 1', chartIDs: [2, 3]},
          {title: 'db 2', chartIDs: [4, 5]}
        ]
      );
    });
  });

  describe(DASHBOARD_REMOVE_CHART, () => {
    it('should remove the chartID from the active dashboard', () => {
      const oldState: Dashboard = {
        activeDashboardID: 0,
        list: [{
          title: 'dashboard 0',
          chartIDs: [1, 3, 5, 7, 9]
        }]
      };
      const newState = dashboardReducer(oldState, {type: 'DASHBOARD_REMOVE_CHART', payload: {chartID: 3}});
      expect(newState.list[0].chartIDs).toEqual([1, 5, 7, 9]);
    });
  });
});