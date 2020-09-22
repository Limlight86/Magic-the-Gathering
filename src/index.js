import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

let app = document.getElementById("root");
if (app) {
  const path = (/#!(\/.*)$/.exec(window.location.hash) || [])[1];
  if (path) {
    history.replace(path);
  }
}

/* the above code is a work around for react router and s3 static site deployment in conjunction with the
following instructions https://viastudio.com/hosting-a-reactjs-app-with-routing-on-aws-s3/ */

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
