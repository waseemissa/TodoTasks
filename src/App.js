import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainPage from "./Pages/MainPage";
import MessagesPage from "./Pages/MessagesPage";
import NotificationsPage from "./Pages/NotificationsPage";
import ProjectsPage from "./Pages/ProjectsPage";
import SkillsPage from "./Pages/SkillsPage";
import EducationPage from "./Pages/EducationPage";
import ExperiencePage from "./Pages/ExperiencePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import UserEducationPage from "./Pages/Profile/UserEducationPage";
import UserSkillsPage from "./Pages/Profile/UserSkillsPage";
import UserFeed from "./Pages/Profile/UserFeed";
import UserExperiencePage from "./Pages/Profile/UserExperiencePage";
import ConnectionsPage from "./Pages/ConnectionsPage";
import firebase from './firebase';
import { render } from "@testing-library/react";

export default class App extends React.Component {

  componentDidMount(){
    const messaging = firebase.messaging();
    Notification.requestPermission().then(()=>{
      return messaging.getToken();
    }).then(token =>{
      localStorage.setItem('device_token', token);
      console.log(token);
    }).catch((error)=>{
      console.log(error);
    })

  }
  render(){
    return (
      <div>
        <Router basename='/index.html'>
        <Switch>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/user-feed">
            <MainPage />
          </Route>
          <Route path="/connections">
            <ConnectionsPage />
          </Route>
          <Route path="/messages">
            <MessagesPage />
          </Route>
          <Route path="/notifications">
            <NotificationsPage />
          </Route>
          <Route path="/projects">
            <ProjectsPage />
          </Route>
          <Route path="/user-skills">
            <SkillsPage />
          </Route>
          <Route path="/user-education">
            <EducationPage />
          </Route>
          <Route path="/user-experience">
            <ExperiencePage />
          </Route>
  
          {/* Routes for a specific user */}
          <Route path="/feed">
            <UserFeed />
          </Route>
          <Route path="/education" >
            <UserEducationPage />
          </Route>
          <Route path="/skills">
            <UserSkillsPage />
          </Route>
          <Route path="/experience">
            <UserExperiencePage />
          </Route>
        </Switch>
        </Router>
      </div>
    );
  }
  
}

