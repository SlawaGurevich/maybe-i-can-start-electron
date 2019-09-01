import React, { Component } from 'react';

import SelectorLine from './SelectorLine';

import './PeopleSelector.scss'

export class PeopleSelector extends Component {
	constructor(props) {
		super(props)
		this.state.data = props.data;
	}

	state = {
		phase: 0,
		data: [],
	}

	componentDidMount() {
		console.log("did mount");
	}

	render() {
		return (
			<div>
				<div id="people-selector">
					{this.state.data.map(
						member => {
							return(
								<SelectorLine key={member._id} uid={member._id} name={member.name} role={member.role} roleObj={member.roleObj} />
							)
						}
					)}
				</div>
				<div id="spin-button">Press [space] to start.</div>
			</div>
		)
	}
}

export default PeopleSelector;