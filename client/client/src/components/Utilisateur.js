import React from 'react';
import axios from 'axios';
class Utilisateur extends React.Component {

    state = {
        users:[],
    }

    componentWillMount() {
        axios.get('http://localhost:9000/user').then((response) => {
            this.setState({
                users: response.data
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        let users = this.state.users.map((user) => {
            return (
                <tr key={user.id_user}>
                    <td>{user.id_user}</td>
                    <td>{user.prenom_user}</td>
                    <td>{user.nom_user}</td>
                    <td>{user.genre}</td>
                    <td>{user.addressse}</td>
                    <td>{user.email}</td>
                    <td>{user.mot_de_passe}</td>
                </tr>
            )
        })
        return (
            <div>
                <table>
                    {users}
                </table>
            </div>
        )
    }
}

export default Utilisateur