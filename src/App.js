import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';

class App extends Component {
  renderRoute = (routeKey, i) => {
    const route = routes[routeKey];

    const props = {
      key: i,
      path: route.path,
      component: route.component,
      exact: true,
    };

    return <Route {...props} />;
  }

  render() {
    return (
      <div className='main' role="main">
        <Switch>
          {
            Object.keys(routes).map((routeKey, i) => this.renderRoute(routeKey, i))
          }
        </Switch>
      </div>
    );
  }
}

export default App;
