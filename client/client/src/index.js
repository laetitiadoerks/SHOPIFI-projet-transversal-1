import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';


//Routage qui permet de naviguer à travers les différents pages de l'application
//Cookies provider qui wrap autour de la composante app permet de définir cookies object et de l'utiliser
//dans toute l'app
const rendering = (
    <CookiesProvider>
        <Router>
                <App />
        </Router>
    </CookiesProvider>
    )
    
    
    ReactDOM.render(rendering, document.getElementById('root'));
    
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
