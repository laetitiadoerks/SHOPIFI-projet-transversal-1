import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';



class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            mot_de_passe: "",
            loggedInOk: "",
            token: "",
            films:[],
        };

        //This binding is necessary to make 'this' work in the callback
        //. En JavaScript, les méthodes de classes ne sont pas liées par défaut. 
        //Si vous oubliez de lier this.handleClick et l’utilisez dans onClick, 
        //this sera undefined quand la fonction sera appelée.
        //En général, si vous faites référence à une méthode sans l’appeler avec (), comme dans onClick={this.handleClick}, 
        //vous devriez lier cette méthode.
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSet = this.onSet.bind(this);
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
            //Pour que ça soit dans le body de la requête 
            params: {
                username,
                password
            }})
            //Toujours utilisé les arrows pour bien définir le contexte
            .then(response => {
                const answer = response.statusText;

                //Si n'utilise pas arrows
                this.setState({ loggedInOk: answer, token: document.cookie});
                console.log(answer);
                console.log(response);
                console.log(document.cookie);
            //    history.push('/utilisateur');
            })
            .catch(function (error) {
                console.log(error)
            });

    }

    onSet(event) {
        axios.get('http://localhost:9000/produit', { params: { 'id_produit': '2' } } ).then((response) => {
            this.setState({
                films: response.data
            });
            console.log("yo")
            console.log(response.data[0].nom_user)
        })
    }

    //Redirect après que l'utilisateur se soit connecter

    render() {
        let films = this.state.films.map((film) => {
            return (
                <tr key={film.id_produit}>
                    <th>{film.id_produit}</th>
                    <th>{film.nom_produit}</th>
                    <th>{film.prix}</th>
                    <th>
                        <button>Yes</button>
                        <button>Nope</button>
                    </th>
                </tr>
            )
        });
        return (
            <div>
                <body>
                <form>
                    Email:<br />
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                    <br />
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <button type="button" value={this.state.loggedInOk} onClick={this.onSubmit}>Se connecter</button>
                        <button type="button" value={this.state.loggedInOk} onClick={this.onSet}>bad</button>
                    </form>

                    <p>{this.state.token}</p>
                </body>
            </div>)
    }
}

export default Login;