import React from 'react';

const url = "http://localhost:9000/testFilm";

class Films extends React.Component {
	
	state = {
		films: []
	}

	componentDidMount(){
		fetch(url)
		.then(res => res.json())
		.then((data) =>{
			this.setState({films: data})
			console.log(this.state.films)
		})
		.catch(console.log)
	}

	render(){
		return(
			<div>
			nom du film 
			<p>{this.state.films}</p>
			</div>
			)
	}
}


export default Films