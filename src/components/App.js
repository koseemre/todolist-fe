import React, { Component } from "react";
import "./App.css";

import Header from "./Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store/store";

import Landing from "./Layout/Landing";
import Register from "./UserManagement/Register";
import Login from "./UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "../securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "../actions/types";
import { logout } from "../actions/securityActions";
import SecuredRoute from "../securityUtils/SecureRoute";
import Dashboard from "./Dashboard"

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public Routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            {<Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
            </Switch> 
             /*  <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecuredRoute
                exact
                path="/updateProjectTask/:backlog_id/:pt_id"
                component={UpdateProjectTask}
              />
            </Switch> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;