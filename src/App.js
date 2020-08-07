import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  Landing,
  Success,
  StreamerInfo,
} from "./screens";
import "./App.css";

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/streamer">
            <StreamerInfo />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
