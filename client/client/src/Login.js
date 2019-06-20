import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };

        //This binding is necessary to make 'this' work in the callback
        //. En JavaScript, les méthodes de classes ne sont pas liées par défaut. 
        //Si vous oubliez de lier this.handleClick et l’utilisez dans onClick, 
        //this sera undefined quand la fonction sera appelée.
        //En général, si vous faites référence à une méthode sans l’appeler avec (), comme dans onClick={this.handleClick}, 
        //vous devriez lier cette méthode.
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