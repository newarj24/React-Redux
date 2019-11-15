import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './home/Homepage';
import Aboutpage from './about/Aboutpage';
import Header from './common/Header';
import AuthorPage from './authors/AuthorsPage';
import PageNotFound from './PageNotFound';
import CoursesPage from './courses/CoursesPage';
import ManageCoursePage from './courses/ManageCoursePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className='container-fluid px-0 text-center'>
    <Header />
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route path='/about' component={Aboutpage} />
      <Route path='/courses' component={CoursesPage} />
      <Route path='/course/:slug' component={ManageCoursePage} />
      <Route path='/course' component={ManageCoursePage} />
      <Route path='/authors' component={AuthorPage} />
      <Route component={PageNotFound} />
    </Switch>
    <ToastContainer autoClose={3000} hideProgressBar />
  </div>
);

export default App;
