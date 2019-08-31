import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import withSecondaryView from '../SecondaryView';
import MembersEditView from '../MembersEditView';

import './OptionsView.scss';

class OptionsView extends Component {
	state = {
		selectedKey: 'home'
	}

	handleTabChange = (evt, key) => {
		this.setState({selectedKey: key});
	}

	render() {
		return(
			<>
				<Tabs className="options__tabbed-views col-sm-12">
					<TabList>
						<Tab>Data</Tab>
						<Tab>Options</Tab>
					</TabList>

					<TabPanel>
						<MembersEditView />
					</TabPanel>

					<TabPanel>
						Options
					</TabPanel>
				</Tabs>
			</>
		);
	}
}

export default withSecondaryView(OptionsView);