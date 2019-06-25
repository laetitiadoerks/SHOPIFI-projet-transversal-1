import React from 'react';
import Product from './film/Product';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            films: [],
        }
    }

    componentWillMount() {
        axios.get('http://localhost:9000/produit', { params: { 'id_produit': '2' } }).then((response) => {
            this.setState({
                films: response.data
            });
            console.log(response.data)
        })
    }

    render() {
        let films = this.state.films.map((film) => {
            return (
                <tr key={film.id_produit}>
                    <td>{film.id_produit}</td>
                    <td>{film.nom_produit}</td>
                    <td>{film.prix}</td>
                    <td>{film.description_produit}</td>
                </tr>
                )
        })
        return (
            <div>
                <table>
                    {films}
                    <Product nom_produit="Dune" description_produit="Auxerunt haec vulgi 
                        sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli
                        cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi
                        iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando
                        discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi considerans
                        documento recenti similia formidabat." />
                    <Product  nom_produit="The Matrix" description_produit="Postremo ad id indignitatis est ventum, 
                        ut cum peregrini ob formidatam haut ita dudum alimentorum inopiam pellerentur 
                        ab urbe praecipites, sectatoribus disciplinarum liberalium inpendio paucis sine respiratione
                        ulla extrusis, tenerentur minimarum adseclae veri, quique id simularunt ad tempus, et tria milia 
                        saltatricum ne interpellata quidem cum choris totidemque remanerent magistris." />
                </table>
            </div>
            )
    }
}