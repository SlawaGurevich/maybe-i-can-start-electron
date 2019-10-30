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

	render() {
		return (
			<div>
				<div id="people-selector">
					{this.state.data.map(
						(member, key) => (
							<SelectorLine key={member._id} uid={key} picture={member.picture} name={member.name} role={member.role} />
						)
					)}
				</div>
			</div>
		)
	}
}

export default PeopleSelector;