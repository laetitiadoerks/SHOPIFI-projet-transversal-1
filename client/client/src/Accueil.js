import React from 'react';
import Login from './Login.js';
import { Redirect } from 'react-router-dom';
import isAuthenticated from './components/isAuthenticated';


export default function Accueil(){

    const authenticated = isAuthenticated()
    if(authenticated) {
        return <Redirect to="/" />
    }

        return (
            <div>
                <head> 
                    <title>Page d'accueil</title>
                </head>
                <body>
                    <Login />
                    La page d'accueil
            </body>
            </div>
            )
    }
