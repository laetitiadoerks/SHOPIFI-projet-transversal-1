import React from "react";
import "./login.css"


class Login extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			username:'',
			mdp:'',
			isLoading: 'false',
		};
	}
  	
  	handleChange = event => {
    		this.setState({
      	[event.target.name]: event.target.value
    	});
  	};

  	onSubmit = () => {
    	alert('Authentification en cours');
    	fetch('http://localhost:9000/testAPI')
    	.then(response => response.json())
    	.then(parsedJSON => console.log(parsedJSON.results))
    	.catch(error => console.log('parsing failed', error))
  	};

  	componentDidMount(){
  		this.onSubmit();
  	}

	render(){
		return(
			<div className = "login-container">
			<div>
				<input className = "login-label-email" type = "text" name ="username" placeholder="e-mail"
				onChange={this.handleChange}/>
				<hr className ="lines"/>
				<input className = "login-label-mdp"
				type = "password" name ="password" placeholder="mot de passe" onChange={this.handleChange}/>
				
			</div>
			<button className = "login-btn" type="button" onClick={this.onSubmit}>Login</button>
			<hr className="lines"/>
			</div>
		)
	}
}

export default Login;