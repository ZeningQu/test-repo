import * as React from 'react';
// import { GenresMenu } from './components/genres-menu';
// import { ExamplesMenu } from './components/examples-menu';
// import { Canvas } from './components/canvas';
import { AppRoot } from './components/app-root';
import './App.css';
import './App-Overwrite-Voyager.css';
import 'font-awesome/css/font-awesome.css';

class App extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div className="App">
        <AppRoot />
      </div>
    );
  }
}

export default App;
