import React from 'react';
import img_film from './img_film.png';

export default class Product extends React.Component {
    render() {
        return (
            <div>
                <img src={img_film}/>
                <h3>{this.props.nom_produit}</h3>
                <h4>Description</h4>
                <p>{this.props.description_produit}</p>
                <button>Acheter</button>
            </div>
            )
    }
}