import React, { Component } from 'react';
import withSecondaryView from '../SecondaryView';
import MembersEditView from '../MembersEditView';

class OptionsView extends Component {
	render() {
		return(
			<MembersEditView />
		);
	}
}

export default withSecondaryView(OptionsView);