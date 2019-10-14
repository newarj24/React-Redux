import React from 'react';
import {render} from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import './index.css';

render( <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById("app")
);