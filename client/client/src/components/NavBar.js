import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import icone from '../icone.svg';
import styled from 'styled-components';
import { ButtonContainer } from './button.js';

export default class NavBar extends React.Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-exapand-sm navbar-dark px-sm-5">
                {/*Ou sera renvoyer l'utilisateur quand il clique sur le logo*/}
                <Link to='/'>
                    <img src={icone} alt="logo 2" className="navbar-brand" />
                    {/*<img src={logo} alt="logo" className="navbar-brand" >*/}
                 </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link">
                            Products
                        </Link>
                    </li>
                </ul>
                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2"> 
                        <i className="fas fa-cart-plus" />
                        my cart
                        </span>
                    </ButtonContainer>
                </Link>
                <h3>Hello from navbar</h3>
            </NavWrapper>
            )
    }
}

const NavWrapper = styled.nav`
    background:var(--mainBlue);
    .nav-link{
       color:var(--mainWhite)!important;
       font-size:1.3rem;
    }
`
