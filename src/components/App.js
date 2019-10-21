import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./home/Homepage";
import Aboutpage from "./about/Aboutpage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";

const App = () => (
  <div className="container-fluid text-center">
    <Header />
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/about" component={Aboutpage} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:slug" component={ManageCoursePage} />
      <Route path="/course" component={ManageCoursePage} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;
