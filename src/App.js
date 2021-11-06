import * as React from "react";
import { Route, Switch } from "react-router-dom";
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
import SearchResults from "./Pages/SearchResults";
import firebase from "./firebase";
import BlockedContacts from "./Pages/BlockedContacts";
import { isIOS } from "react-device-detect";

export default class App extends React.Component {
  componentDidMount() {
    if (!isIOS) {
      const messaging = firebase.messaging();
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("./firebase-messaging-sw.js")
          .then(function (registration) {
            console.log(
              "Registration successful, scope is:",
              registration.scope
            );
            Notification.requestPermission().then(() => {
              messaging
                .getToken({
                  vapidKey:
                    "BPeIeKcMyJbJ6ag2MRhpHdSLOUvNvhPsJp6KXIrPFXllE8LcGx3Mfsm54SwXiir8YsmY_8wWjrOwmJadR-g10l4",
                  serviceWorkerRegistration: registration,
                })
                .then((currentToken) => {
                  if (currentToken) {
                    console.log("current token for client: ", currentToken);
                    localStorage.setItem("device_token", currentToken);
                  } else {
                    console.log(
                      "No registration token available. Request permission to generate one."
                    );
                  }
                })
                .catch((err) => {
                  console.log(
                    "An error occurred while retrieving token. ",
                    err
                  );
                });
            });
          })
          .catch(function (err) {
            console.log("Service worker registration failed, error:", err);
          });
      }
    }
  }
  render() {
    return (
      <div>
        <Switch>
          {/* Routes for personal profile */}
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
          <Route path="/blocked">
            <BlockedContacts />
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
          <Route path="/search">
            <SearchResults />
          </Route>

          {/* Routes for showing any user profile */}
          <Route path="/feed">
            <UserFeed />
          </Route>
          <Route path="/education">
            <UserEducationPage />
          </Route>
          <Route path="/skills">
            <UserSkillsPage />
          </Route>
          <Route path="/experience">
            <UserExperiencePage />
          </Route>
        </Switch>
      </div>
    );
  }
}
