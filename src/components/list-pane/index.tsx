import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { PlotTabState } from 'datavoyager/build/models';
import { TAB_ADD, TAB_REMOVE, TAB_SWITCH, TAB_TITLE_UPDATE } from 'datavoyager/build/actions/tab';
import { selectActiveTabID, selectTab } from 'datavoyager/build/selectors';

import { StoreState, DashboardState, Mode, MODE_CHART, MODE_DASHBOARD } from '../../models';
import {
  DASHBOARD_ADD,
  DASHBOARD_SWITCH,
  DASHBOARD_REMOVE,
  DASHBOARD_TITLE_UPDATE,
  DASHBOARD_ADD_CHART,
  DASHBOARD_REMOVE_CHART,
  DASHBOARD_REMOVE_CHART_IN_ALL,
  MODE_SET
} from '../../actions';
import { selectActiveDashboardID, selectDashboard, selectMode } from '../../selectors';
import { ItemTitleUI } from './item-title';
import './list-pane.css';

export interface ListPaneProps {
  listTitle: string;  // e.g., Charts (#), Dashboards (#), Stories (#)
  list: string[];     // List of item names

  activeItemID: number;
  isItemActive: (index: number) => boolean;

  appMode: Mode; // app mode
  modeToSet: Mode; // local mode to set

  /* Actions */
  onModeSet: () => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onSwitch: (index: number) => void;
  onTitleUpdate: (newTitle: string) => void;

  /* Add/remove chart in dashboard */
  activeDashboardChartIDs: number[];
  onAddTo: (index: number) => void; // e.g., add chart to dashboard
  onRemoveFrom: (index: number) => void; // e.g., remove chart in dashboard
  onRemoveInAll: (index: number) => void; // e.g., remove chart in all dashboards
}

export class ListPaneUI extends React.PureComponent<ListPaneProps, {}> {
  constructor(props: ListPaneProps) {
    super(props);
    this.onItemNew = this.onItemNew.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onItemAddTo = this.onItemAddTo.bind(this);
    this.onItemRemoveFrom = this.onItemRemoveFrom.bind(this);
  }

  public render() {
    return (
      <div>
        {/* Title */}
        <div className="list-title"><h2>{this.props.listTitle}</h2></div>

        {/* List of items */}
        {this.props.list.map((itemTitle, itemIndex) => {
          const isActiveItem = this.props.isItemActive(itemIndex);
          const isActiveClass = isActiveItem ? 'active' : '';

          const removeButton = isActiveItem
            && <span className={'right remove-list-item ' + isActiveClass}>
                <a onClick={() => this.onItemRemove(itemIndex)}><i className="fa fa-times"/></a>
               </span>;

          const addChartToDashboardButton =
            <span className="right add-chart-to-dashboard">
              <a onClick={() => this.onItemAddTo(itemIndex)}><i className="fa fa-plus"/></a>
            </span>;

          const removeChartFromDashboardButton =
            <span className="right remove-chart-from-dashboard">
              <a onClick={() => this.onItemRemoveFrom(itemIndex)}><i className="fa fa-minus"/></a>
            </span>;

          const chartDashboardButton =
            (this.props.appMode === MODE_DASHBOARD // user is in dashboard
              && this.props.modeToSet === MODE_CHART)  // and this is chart list pane
              && ((this.props.activeDashboardChartIDs.indexOf(itemIndex) === -1) ? // does dashboard contain chart?
              addChartToDashboardButton : removeChartFromDashboardButton);

          return(
            <div key={itemIndex} className={'list-item ' + isActiveClass}>
              {/* Item Title */}
              <span
                onClick={() => this.onItemClick(itemIndex)}
                className="list-item-name"
              >
                <ItemTitleUI
                  itemTitle={itemTitle}
                  isActiveItem={isActiveItem}
                  onTitleUpdate={this.props.onTitleUpdate}
                />
              </span>
              {removeButton}
              {chartDashboardButton}
            </div>
          );
        })}

        {/* New button */}
        <div className="list-item" onClick={this.onItemNew}>
          <span className="list-item-new">+ new</span>
        </div>
      </div>
    );
  }

  onItemNew() {
    this.props.onAdd();
    this.props.onModeSet();
  }

  onItemRemove(itemIndex: number) {
    // first, for charts, remove this chart in all dashboards
    if (this.props.onRemoveInAll) {
      this.props.onRemoveInAll(itemIndex);
    }
    // then, remove the chart
    this.props.onRemove(itemIndex);
  }

  onItemClick(itemIndex: number) {
    // Only dispatch switch action if the clicked item is different from the active item
    if (itemIndex !== this.props.activeItemID) {
      this.props.onSwitch(itemIndex);
    }

    // Only dispatch mode set action if the click will change the app mode
    if (this.props.modeToSet !== this.props.appMode) {
      this.props.onModeSet();
    }
  }

  onItemAddTo(itemIndex: number) {
    if (this.props.onAddTo) {
      this.props.onAddTo(itemIndex);
    }
  }

  onItemRemoveFrom(itemIndex: number) {
    if (this.props.onRemoveFrom) {
      this.props.onRemoveFrom(itemIndex);
    }
  }

}

function getActiveDashboardChartCollection(state: StoreState): number[] {
  const activeDashboardID = selectActiveDashboardID(state);
  return selectDashboard(state).list[activeDashboardID].chartIDs;
}

export const ChartListPane = connect(
  (state: StoreState) => {
    return {
      listTitle: 'Charts (' + selectTab(state).list.length + ')',
      list: selectTab(state).list.map((chart: PlotTabState, index: number) => {
        return chart.title;
      }),
      isItemActive: (chartIndex: number): boolean => {
        return selectMode(state) === MODE_CHART // should be in chart mode
          && (chartIndex === selectActiveTabID(state)); // index should match
      },
      activeItemID: selectActiveTabID(state),
      appMode: selectMode(state),
      modeToSet: MODE_CHART,
      activeDashboardChartIDs: getActiveDashboardChartCollection(state)
    };
  },
  (dispatch: Dispatch<{}>) => {
    return {
      onModeSet: () => {
        dispatch({type: MODE_SET, payload: {mode: MODE_CHART}});
      },
      onAdd: () => {
        dispatch({type: TAB_ADD});
      },
      onRemove: (chartIndex: number) => {
        dispatch({type: TAB_REMOVE});
      },
      onSwitch: (chartIndex: number) => {
        dispatch({type: TAB_SWITCH, payload: {tabID: chartIndex}});
      },
      onTitleUpdate: (newTitle: string) => {
        dispatch({type: TAB_TITLE_UPDATE, payload: {title: newTitle}});
      },
      onAddTo: (chartIndex: number) => {
        dispatch({type: DASHBOARD_ADD_CHART, payload: {chartID: chartIndex}});
      },
      onRemoveFrom: (chartIndex: number) => {
        dispatch({type: DASHBOARD_REMOVE_CHART, payload: {chartID: chartIndex}});
      },
      onRemoveInAll: (chartIndex: number) => {
        dispatch({type: DASHBOARD_REMOVE_CHART_IN_ALL, payload: {chartID: chartIndex}});
      }
    };
  }
)(ListPaneUI);

export const DashboardListPane = connect(
  (state: StoreState) => {
    return {
      listTitle: 'Dashboards (' + selectDashboard(state).list.length + ')',
      list: selectDashboard(state).list.map((dashboard: DashboardState, index: number) => {
        return dashboard.title;
      }),
      isItemActive: (dashboardIndex: number): boolean => {
        return (selectMode(state) === MODE_DASHBOARD) // should be in dashboard mode
         && (dashboardIndex === selectActiveDashboardID(state)); // index should match
      },
      activeItemID: selectActiveDashboardID(state),
      appMode: selectMode(state),
      modeToSet: MODE_DASHBOARD
    };
  },
  (dispatch: Dispatch<{}>) => {
    return {
      onModeSet: () => {
        dispatch({type: MODE_SET, payload: {mode: MODE_DASHBOARD}});
      },
      onAdd: () => {
        dispatch({type: DASHBOARD_ADD});
      },
      onRemove: (dashboardIndex: number) => {
        dispatch({type: DASHBOARD_REMOVE});
      },
      onSwitch: (dashboardIndex: number) => {
        dispatch({type: DASHBOARD_SWITCH, payload: {switchToDashboard: dashboardIndex}});
      },
      onTitleUpdate: (newTitle: string) => {
        dispatch({type: DASHBOARD_TITLE_UPDATE, payload: {title: newTitle}});
      }
    };
  }
)(ListPaneUI);