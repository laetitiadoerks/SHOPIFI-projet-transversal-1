import React from 'react';
import Product from './Product';
import axios from 'axios';

export default class ProductList extends React.Component {
    state = {
        films: [],
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
                </table>
            </div>
            )
    }
}