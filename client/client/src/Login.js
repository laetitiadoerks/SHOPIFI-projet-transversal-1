import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        //This binding is necessary to make 'this' work in the callback
        //. En JavaScript, les m�thodes de classes ne sont pas li�es par d�faut. 
        //Si vous oubliez de lier this.handleClick et l�utilisez dans onClick, 
        //this sera undefined quand la fonction sera appel�e.
        //En g�n�ral, si vous faites r�f�rence � une m�thode sans l�appeler avec (), comme dans onClick={this.handleClick}, 
        //vous devriez lier cette m�thode.
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value});
    }



    render() {

        return (
            <div>Hello Login
                <form>
                    Email:<br />
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/> 
                    <button type="button">Se connecter</button>
                </form>
            </div>)

    }
}

export default Login;