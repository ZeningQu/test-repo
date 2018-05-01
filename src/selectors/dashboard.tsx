import { StoreState, Dashboard, DashboardState } from '../models';

import { selectTab } from 'datavoyager/build/selectors';
import { ShelfFilter, Tab, toTransforms } from 'datavoyager/build/models';
import { FacetedCompositeUnitSpec } from 'vega-lite/build/src/spec';

import { createSelector } from 'reselect';

export const selectDashboard = (state: StoreState): Dashboard => state.undoable.present.dashboard;

export const selectActiveDashboardID = createSelector(
  selectDashboard,
  (dashboard: Dashboard): number => dashboard.activeDashboardID
);

export const selectActiveDashboard = createSelector(
  selectDashboard,
  selectActiveDashboardID,
  (dashboard: Dashboard, id: number): DashboardState => dashboard.list[id]
);

export const selectActiveDashboardChartIDs = createSelector(
  selectActiveDashboard,
  (dashboardState: DashboardState): number[] => dashboardState.chartIDs
);

export const selectActiveDashboardChartSpecs = createSelector(
  selectTab,
  selectActiveDashboardChartIDs,
  (chart: Tab, chartIDs: number[]): FacetedCompositeUnitSpec[] => {
    return chartIDs.map((chartID) => {
      const plots = chart.list[chartID].result.main.plots;
      const spec =  plots ? plots[0].spec : undefined; // See Voyager DEFAULT_RESULT
      const filters = chart.list[chartID].shelf.filters;
      return specWithFilter(spec, filters);
    });
  }
);

/* copied from Voyager's Plot component */
export function specWithFilter(spec: FacetedCompositeUnitSpec, filters: ShelfFilter[])
: FacetedCompositeUnitSpec {
  const transform = (spec.transform || []).concat(toTransforms(filters));
  return {
    ...spec,
    ...(transform.length > 0 ? {transform} : {})
  };
}

export const selectActiveDashboardChartTitles = createSelector(
  selectTab,
  selectActiveDashboard,
  (chart: Tab, activeDashboard: DashboardState): string[] => {
    return activeDashboard.chartIDs.map((chartID) => chart.list[chartID].title);
  }
);