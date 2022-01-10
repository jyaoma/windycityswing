import "../less/main.less";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router";
import history from "./history";

import WindyCitySwing from "./components/WindyCitySwing";
import HomePage from "./components/home/HomePage";
import EventPage from "./components/event/EventPage";

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <WindyCitySwing path="/*">
        <Route exact path="/" component={HomePage} />
        <Route path="/:year-:month" component={HomePage} />
        <Route path="/:eventName--:date" component={EventPage} />
      </WindyCitySwing>
    </Switch>
  </Router>,
  document.getElementById("app")
);
