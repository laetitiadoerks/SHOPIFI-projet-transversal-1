import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Utilisateur from './Utilisateur.js';
import Login from './Login.js';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';


//Routage qui permet de naviguer à travers les différents pages de l'application
const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
            <Route path="/" component={App} />
            <Route path="/utilisateur" component={Utilisateur} />
            <Route path="/login" component={Login} />
        </div>
    </Router>
    )


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
