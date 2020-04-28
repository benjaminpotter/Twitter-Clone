import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';

class App extends React.Component {

  render () {
    return <div>
        <Router>   
          <Switch>
              <Route path="/signup">
                <Signup/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
        </Router>
    </div>
  };
}

export default App;
