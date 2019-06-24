import React from 'react';
import Product from './Product';

export default class ProductList extends React.Component {
    render() {
        return (
            <div>
                Liste de produits
                <Product />
            </div>
            )
    }
}