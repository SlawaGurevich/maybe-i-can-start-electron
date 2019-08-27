import React, { Component } from 'react';

import SelectorLine from './SelectorLine';
import members from '../../utils/config.js';

import './PeopleSelector.scss'

export class PeopleSelector extends Component {
	state = {
		phase: 0,
		data: [],
	}
	
	componentDidMount() {
		console.log("did mount");
		this.setState({
			data: members
		});
		console.log(members);
	}
	
	render() {
		return (
			<div>
				<div id="people-selector">
					{this.state.data.map(
						member => {
							return(
								<SelectorLine key={member.id} uid={member.id} name={member.name} role={member.role} />
							)
						}
					)}
				</div>
				<div id="spin-button">Press [space] to start.</div>
			</div>
		)
	}
}

export default PeopleSelector