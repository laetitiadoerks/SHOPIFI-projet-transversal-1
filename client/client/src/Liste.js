import React from 'react';
import Film from './Film.js';
import axios from 'axios'
class Liste extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            nomFilm: ['dune', 'lel'],
            sqlNomFilm: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:9000/recommandation').then((response) => {
            this.setState({ nomFilm: response.data });
            console.log(response);
            console.log("yeah");
        })
            .catch(err => { /* not hit since no 401 */ })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.list.map(item => (
                        <li key={item}>{item}</li>))
                    }
                </ul>
                <Film nomFilm={this.state.nomFilm[0]}/>
                <Film nomFilm={this.state.nomFilm[1]}/>
                <p>{this.props.oy}</p>
            </div>
            )
    }
}

export default Liste;