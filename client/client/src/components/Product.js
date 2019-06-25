import React from 'react';

export default class Product extends React.Component {
    render() {
        return (
            <div>
                Le film {this.props.name}
            </div>
            )
    }
}