import {
  DEFAULT_STATE,
  DEFAULT_DASHBOARD,
  DEFAULT_ACTIVE_DASHBOARD_ID,
  DEFAULT_DASHBOARD_STATE,
  DEFAULT_UNDOABLE_STATE,
  DEFAULT_UNDOABLE_STATE_BASE
} from '../models';
import {
  selectDashboard,
  selectActiveDashboardID,
  selectActiveDashboard,
  selectActiveDashboardChartIDs,
  selectActiveDashboardChartSpecs
} from './dashboard';

import { DEFAULT_TAB, DEFAULT_PLOT_TAB_STATE, DEFAULT_RESULT_INDEX, DEFAULT_RESULT, DEFAULT_SHELF }
from 'datavoyager/build/models';
import { POINT } from 'vega-lite/build/src/mark';

describe('selectors/dashboard', () => {
  describe('selectDashboards', () => {
    it('should select dashboards from store state', () => {
      expect(selectDashboard(DEFAULT_STATE)).toBe(DEFAULT_DASHBOARD);
    });
  });

  describe('selectActiveDashboardID', () => {
    expect(selectActiveDashboardID(DEFAULT_STATE)).toBe(DEFAULT_ACTIVE_DASHBOARD_ID);
  });

  describe('selectActiveDashboard', () => {
    expect(selectActiveDashboard(DEFAULT_STATE)).toBe(DEFAULT_DASHBOARD_STATE);
  });

  describe('selectActiveDashboardChartIDs', () => {
    expect(selectActiveDashboardChartIDs(DEFAULT_STATE)).toEqual([]);
  });

  describe('selectActiveDashboardChartSpecs', () => {
    const spec = {mark: POINT, encoding: {}};
    const plot = {
      fieldInfos: [] as any[],
      spec: spec
    };

    const tabState = {
      ...DEFAULT_PLOT_TAB_STATE,
      result: {
        ...DEFAULT_RESULT_INDEX,
        main: {
          ...DEFAULT_RESULT,
          plots: [plot, plot]
        }
      },
      shelf: {
        ...DEFAULT_SHELF,
        filters: [{
          field: 'test field',
          range: [0, 1]
        }]
      }
    };
    const oldState = {
      ...DEFAULT_STATE,
      undoable: {
        ...DEFAULT_UNDOABLE_STATE,
        present: {
          ...DEFAULT_UNDOABLE_STATE_BASE,
          tab: {
            ...DEFAULT_TAB,
            list: [tabState, tabState]
          },
          dashboard: {
            ...DEFAULT_DASHBOARD,
            activeDashboardID: 0,
            list: [{
              ...DEFAULT_DASHBOARD_STATE,
              chartIDs: [0, 1]
            }]
          }
        }
      }
    };

    it('should combine chart specs and their shelf filters', () => {
      const combinedSpec = {
        ...spec,
        transform: [{filter: {
          field: 'test field',
          range: [0, 1]
        }}]
      };
      expect(selectActiveDashboardChartSpecs(oldState)).toEqual([combinedSpec, combinedSpec]);
    });
  });
});
