import React, { Component } from 'react';

import { withStore } from '../../context/OptionContext';

import SelectorLine from './SelectorLine';

import './PeopleSelector.scss'

export class PeopleSelector extends Component {
	state = {
		phase: 0,
		data: [],
	}

	render() {
		return (
			<div>
				<div id="people-selector">
					{this.props.store.get("members").map(
						(member, key) => (
							<SelectorLine key={member._id} uid={key} picture={member.picture} name={member.name} role={member.role} />
						)
					)}
				</div>
			</div>
		)
	}
}

export default withStore(PeopleSelector);