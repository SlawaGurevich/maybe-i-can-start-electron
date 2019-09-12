import React, { Component } from 'react';

class SpinningTracker extends Component {
	constructor (props){
		super(props);
		this.state = {
			data: props.data,
		}
	}

	render() {
		return (
			<>
				Spinning tracker
			</>
		)
	}
}

export default SpinningTracker;