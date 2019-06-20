import React from 'react';
import './App.css';
import BoxContainer from './components/boxcontainer';
import {BrowserRouter,NavLink, Route} from 'react-router-dom';
import Accueil from './components/accueil';


//Chercher API pour récupérer les données d'API

class App extends React.Component {

  //Etat par défault
  constructor(props) {
    super(props);
    //Pour récuprérer les données de l'API
    this.state = { apiResponse: "" };
  }

  //Récupérer les informations via fetch et store ces informations dans apiResponse
  //callAPI() {
  //  fetch("http://localhost:9000/testAPI")
  //      .then(res => res.text())
  //      .then(res => this.setState({ apiResponse: res }));
  //}

  //Execute callApi après le premier render des composantes
  //componentDidMount() {
  //  this.callAPI();
  // }

  render(){
  return (
    <BrowserRouter> 
    <div className="App">
      <header>
        <NavLink exact to="/">Login</NavLink>
        <Route exact path="/" component={BoxContainer} />
        <NavLink exact to="/Accueil">Accueil</NavLink>
        <Route exact path="/Accueil" component={Accueil} />
        <p className="App-intro">
          {this.state.apiResponse}
        </p>
      </header>
      <main>
      </main>
    </div>
    </BrowserRouter>
    );
  }
}

export default App;
