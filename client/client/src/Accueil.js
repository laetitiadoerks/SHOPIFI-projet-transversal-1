import React from 'react';
import Login from './Login.js';
import { Redirect } from 'react-router-dom';


export default function Accueil(){


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
