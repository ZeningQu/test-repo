import { Action,
  DASHBOARD_ADD,
  DASHBOARD_REMOVE,
  DASHBOARD_SWITCH,
  DASHBOARD_TITLE_UPDATE,
  DASHBOARD_REMOVE_CHART_IN_ALL,
  DASHBOARD_ADD_CHART,
  DASHBOARD_REMOVE_CHART } from '../actions';
import { Dashboard, DashboardState, DEFAULT_DASHBOARD, DEFAULT_DASHBOARD_STATE } from '../models';
import { modifyItemInArray, removeItemFromArray } from 'datavoyager/build/reducers/util';

export function dashboardReducer(dashboards: Readonly<Dashboard> = DEFAULT_DASHBOARD, action: Action):
Readonly<Dashboard> {
  /* multi-dashboards actions */
  const {activeDashboardID, list} = dashboards;
  switch (action.type) {
    case DASHBOARD_ADD:
      return {
        ...dashboards,
        activeDashboardID: list.length, // set new dashboard active
        list: [...list, DEFAULT_DASHBOARD_STATE]
      };

    case DASHBOARD_REMOVE:
      if (list.length === 1) { // if only one dashboard, don't remove
        return dashboards;
      }
      // set next dashboard, or the last tab in the list, active
      const newActiveDashboardID = (activeDashboardID === (list.length - 1)) ? list.length - 2 : activeDashboardID;
      return {
        ...dashboards,
        activeDashboardID: newActiveDashboardID,
        list: removeItemFromArray(list, activeDashboardID).array
      };

    case DASHBOARD_SWITCH:
      if (activeDashboardID === action.payload.switchToDashboard) {
        return dashboards;
      }
      return {
        ...dashboards,
        activeDashboardID: action.payload.switchToDashboard
      };

    case DASHBOARD_REMOVE_CHART_IN_ALL:
      return {
        ...dashboards,
        list: dashboards.list.map((dashboardState: DashboardState) => {
          const oldChartIDs = dashboardState.chartIDs;
          const chartIDToRemove = action.payload.chartID;
          const removeIndex = oldChartIDs.indexOf(chartIDToRemove);

          // Remove chartID if it's in the dashboard
          const chartIDsAfterRemove = (removeIndex > -1) ?
            removeItemFromArray(oldChartIDs, removeIndex).array : oldChartIDs;

          // Recalculate chartIDs for charts after the chart being removed
          const chartIDsAfterRecalculation = chartIDsAfterRemove.map((chartIDInDashboard: number) => {
            // decrease chartID by 1 for all charts that come after
            if (chartIDInDashboard > chartIDToRemove) {
              return (chartIDInDashboard - 1);
            }
            // don't change chartID for charts that come before
            return chartIDInDashboard;
          });
          return {
            ...dashboardState,
            chartIDs: chartIDsAfterRecalculation
          };
        })
      };

    /* single-dashboard actions */
    case DASHBOARD_TITLE_UPDATE:
      return {
        ...dashboards,
        list: modifyItemInArray(list, activeDashboardID, (dashboardState: DashboardState) => {
            return {
              ...dashboardState,
              title: action.payload.title
            };
          })
      };

    // dashboards and charts
    case DASHBOARD_ADD_CHART:
      return {
        ...dashboards,
        list: modifyItemInArray(list, activeDashboardID, (dashboardState: DashboardState) => {
          return {
            ...dashboardState,
            chartIDs: [...dashboardState.chartIDs, action.payload.chartID]
          };
        })
      };

    case DASHBOARD_REMOVE_CHART:
      return {
        ...dashboards,
        list: modifyItemInArray(list, activeDashboardID, (dashboardState: DashboardState) => {
          return {
            ...dashboardState,
            chartIDs: removeItemFromArray(
              dashboardState.chartIDs,
              dashboardState.chartIDs.indexOf(action.payload.chartID)).array
          };
        })
      };

    default:
      return dashboards;
  }
}