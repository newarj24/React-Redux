import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './home/Homepage';
import Aboutpage from './about/Aboutpage';
import Header from './common/Header';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';

const App = () => (
    <div className="container-fluid text-center">
        <Header />
        <Switch>
            <Route exact path = "/" component = {Homepage} />
            <Route path = "/about" component = {Aboutpage} />
            <Route path = "/courses" component = {CoursesPage} />
            <Route component = {PageNotFound} />
        </Switch>
    </div>
);

export default App;