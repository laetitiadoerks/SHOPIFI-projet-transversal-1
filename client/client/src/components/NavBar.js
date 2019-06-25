import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import icone from '../icone.svg';
import styled from 'styled-components';
import { ButtonContainer } from './button.js';
import './NavBar.css';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="App-header">
                <nav>
                {/*Ou sera renvoyer l'utilisateur quand il clique sur le logo*/}
                <Link className="App-header "to='/'>
                    <img src={icone} alt="logo 2"  />
                    {/*<img src={logo} alt="logo" className="navbar-brand" >*/}
                </Link>
                <Link className="App-header" to="/">
                      Films
                </Link>
                <Link className="App-header" to="/cart">
                        <span > 
                        <i className="fas fa-cart-plus" />
                         mon cadis
                        </span>
                    </Link>
                </nav>
            </div>
            )
    }
}

