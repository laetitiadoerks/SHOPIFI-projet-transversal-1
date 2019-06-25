import React from 'react';
import axios from 'axios';
class Utilisateur extends React.Component {

    state = {
        user:[],
    }

    componentWillMount() {
        axios.get('http://localhost:9000/user', { params: { 'id_user':'98'}}).then((response) => {
            this.setState({
                user: response.data
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (<div>
            {this.state.user}
            </div>)
    }
}

export default Utilisateur