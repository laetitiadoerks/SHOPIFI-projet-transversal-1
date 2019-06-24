import React from 'react';
import './App.css';
import logo from './logo.svg';
import Accueil from './Accueil.js';
import Logged from './Logged.js';
import Login from './Login.js';
import { Switch, Route } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import NavBar from './components/NavBar';
import Utilisateur from './Utilisateur';
function App() {
    return (
        <div>
            <React.Fragment>
            <NavBar />
        <Switch>
             {/*Page accessible à tout le monde*/}
            <Route exact path="/" component={ProductList} />
            <Route exact path="/accueil" component={Accueil} />
                    {/*Page accessible à tout le monde*/}
            <Route exact path="/logged" component={Logged} />
            <Route exact path="/details" component={Details} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/Login" component={Login} />
            {/*Pas de path défini dans ce route pour que toute autre requête donne page not found*/}
            <Route exact path="/Utilisateur" component={Utilisateur} />
            <Route component={Default} />
        </Switch>
            </React.Fragment>
        </div>
  );
}

export default withCookies(App);
