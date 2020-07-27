import React, { Component } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";
import checkValidation from "./Utils/checkValidation";
import Login from "./Login";
import Home from "./Home";

class App extends Component {
  state = {};
  render() {
    let validate = checkValidation(this.props.history);

    if (validate) {
      return (
        <Router>
          <Switch>
            <Route exact path="/home" component={Home} />
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/*" render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      );
    }
  }
}

export default App;