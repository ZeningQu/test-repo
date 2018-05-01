import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import * as SplitPane from 'react-split-pane';

import { SPINNER_COLOR } from 'datavoyager/build/constants';
import { VoyagerConfig } from 'datavoyager/build/models/config';
import { Dataset } from 'datavoyager/build/models/dataset';
import { selectConfig } from 'datavoyager/build/selectors';
import { selectDataset } from 'datavoyager/build/selectors/dataset';
import 'datavoyager/build/components/app.scss';
import 'datavoyager/build/components/header/controls.scss';
import { DataPane } from 'datavoyager/build/components/data-pane/index';
import { EncodingPane } from 'datavoyager/build/components/encoding-pane/index';
import { Footer } from 'datavoyager/build/components/footer/index';
import { Header } from 'datavoyager/build/components/header/index';
import { LoadData } from 'datavoyager/build/components/load-data-pane/index';
import { LogPane } from 'datavoyager/build/components/log-pane/index';
import { ViewPane as Chart } from 'datavoyager/build/components/view-pane/index';
import { UndoRedo } from 'datavoyager/build/components/header/undo-redo';

import { ChartListPane} from '../list-pane/index';
import { StoreState, Mode, MODE_CHART } from '../../models';
import { selectMode } from '../../selectors';

export interface AppRootProps {
  dataset: Dataset;
  config: VoyagerConfig;
  mode: Mode;
}

class AppRootBase extends React.PureComponent<AppRootProps, {}> {
  public render() {
    const {dataset, config, mode} = this.props;
    const {hideHeader, hideFooter} = config;
    let bottomPane, footer;
    if (!dataset.isLoading) {
      if (!dataset.data) {
        bottomPane = <LoadData/>;
      } else {
        bottomPane = (
          <SplitPane split="vertical" defaultSize={200} minSize={175} maxSize={350} primary="second">
            <SplitPane split="vertical" defaultSize={200} minSize={175} maxSize={350}>
              <DataPane/>
              <SplitPane split="vertical" defaultSize={235} minSize={200} maxSize={350}>
                <EncodingPane/>
                {mode === MODE_CHART ?
                  <Chart/> :
                  <SplitPane split="horizontal" defaultSize={200} minSize={150} maxSize={600} primary="second">
                    <div>
                      <div />
                      <div />
                    </div>
                    <div />
                  </SplitPane>}
              </SplitPane>
            </SplitPane>
            <div>
                <ChartListPane/>
                <div />
                <div className="controls__controls">
                  <UndoRedo/>
                </div>
              </div>
          </SplitPane>
        );
        if (!hideFooter) {
          footer = <Footer/>;
        }
      }
    }
    return (
      <div className="voyager">
        <LogPane/>
        {!hideHeader && <Header/>}
        <ClipLoader color={SPINNER_COLOR} loading={dataset.isLoading}/>
        {bottomPane}
        {footer}
      </div>
    );
  }
}

export const AppRoot = connect(
  (state: StoreState) => {
    return {
      dataset: selectDataset(state),
      config: selectConfig(state),
      mode: selectMode(state)
    };
  }
)(DragDropContext(HTML5Backend)(AppRootBase));
