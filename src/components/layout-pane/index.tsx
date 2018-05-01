import * as React from 'react';
import { connect } from 'react-redux';

import { StoreState } from '../../models';

export interface LayoutPaneProps {
}

export class LayoutPaneUI extends React.PureComponent<LayoutPaneProps, {}> {
  public render() {
    return (
      <div className="pane">
        <h2>Layout</h2>

        <div>
          <span>x position</span>
          <input type="text"/>
        </div>

        <div>
          <span>y position</span>
          <input type="text"/>
        </div>

        <div>
          <span>width</span>
          <input type="text"/>
        </div>

        <div>
          <span>height</span>
          <input type="text"/>
        </div>

      </div>
    );
  }
}

export const LayoutPane = connect(
  (state: StoreState) => {
    return {};
  }
)(LayoutPaneUI);