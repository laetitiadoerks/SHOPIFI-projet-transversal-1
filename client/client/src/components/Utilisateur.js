import React from 'react';
import axios from 'axios';
import Product from './film/Product.js';
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
                <p>Leo</p>
                <p>21 ans</p>
                <h3>Achats</h3>
                <table>
                    <td><Product nom_produit="Dune" description_produit="Auxerunt haec vulgi 
                        sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli
                        cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi
                        iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando
                        discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi considerans
                        documento recenti similia formidabat."/></td>
                </table>
            </div>
        )
    }
}

export default Utilisateur