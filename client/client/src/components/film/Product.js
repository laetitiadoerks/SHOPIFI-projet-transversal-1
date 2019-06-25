import React from 'react';
import img_film from './img_film.png';
import { Link } from 'react-router-dom';

export default class Product extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            films: [],
        }
        this.onTouch = this.onTouch.bind(this);
    }


    onTouch(event) {
        console.log("button");
    }

    render() {
        return (
            <div>
                <img src={img_film} />
                <h3>{this.props.nom_produit}</h3>
                <h4>Description</h4>
                <p>{this.props.description_produit}</p>
                <button onClick={this.state.onTouch}> Acheter</button>
            </div>
            )
    }
}