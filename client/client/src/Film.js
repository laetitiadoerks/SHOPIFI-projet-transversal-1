import React from 'react';

class Film extends React.Component {
    render() {
        return (
            <div>
                <p>nom de film {this.props.nomFilm}</p>
            </div>
            )
    }
}
export default Film