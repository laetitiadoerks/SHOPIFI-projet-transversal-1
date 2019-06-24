import React from 'react';
import Liste from './Liste.js';

class Recherche extends React.Component{
    render() {
        const Lista = {
            list: [
                "Go to the stoe",
                "Wash the dishes",
                "Learn some code"
            ]
        }

        return (
            <div>
                <Liste list={Lista} oy={'oya'}/>
            </div>
            )
    }
}

export default Recherche;