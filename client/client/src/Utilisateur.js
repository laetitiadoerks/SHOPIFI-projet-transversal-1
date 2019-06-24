import React from 'react';
import axios from 'axios';
class Utilisateur extends React.Component {

    state = {
        films:[],
    }

    componentWillMount() {
        axios.get('http://localhost:9000/user').then((response) => {
            this.setState({
                films: response.data
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (<div>Test
            {this.state.films}
            </div>)
    }
}

export default Utilisateur