import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from './home/Homepage';
import Aboutpage from './about/Aboutpage';
import Header from './common/Header';

const App = () => (
    <div className="container-fluid">
        <Header />
        
        <Route path = "/about" component = {Aboutpage} />
        <Route path = "/" component = {Homepage} />
    </div>
);

export default App;