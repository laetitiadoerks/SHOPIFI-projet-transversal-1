import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            mot_de_passe: "",
            loggedInOk: ""
        };

        //This binding is necessary to make 'this' work in the callback
        //. En JavaScript, les m�thodes de classes ne sont pas li�es par d�faut. 
        //Si vous oubliez de lier this.handleClick et l�utilisez dans onClick, 
        //this sera undefined quand la fonction sera appel�e.
        //En g�n�ral, si vous faites r�f�rence � une m�thode sans l�appeler avec (), comme dans onClick={this.handleClick}, 
        //vous devriez lier cette m�thode.
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value});
    }

    onSubmit(event) {
        const username = 'lo@g.com';
        const password = '1234';
        const { history } = this.props;
        console.log("Email: " + username + " Password: " + password);
        axios.post('http://localhost:9000/login', null, {
            //Pour que �a soit dans le body de la requ�te 
            params: {
                username,
                password,
            }})
            //Toujours utilis� les arrows pour bien d�finir le contexte
            .then(response => {
                const answer = response.statusText;
                //Si n'utilise pas arrows
                this.setState({ loggedInOk: answer });
                history.push('/utilisateur');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //Redirect apr�s que l'utilisateur se soit connecter

    render() {

        return (
            <div>
                <body>
                <form>
                    Email:<br />
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <button type="button" value={this.state.loggedInOk} onClick={this.onSubmit}>Se connecter</button>
                    </form>
                </body>
            </div>)
    }
}

export default Login;