import React, { Component } from 'react';

import './SideBar.scss';
import PeopleSelector from '../PeopleSelector';

export class SideBar extends Component {
	render() {
		return (
			<div id="side-bar">
				<PeopleSelector />
			</div>
		)
	}
}

export default SideBar