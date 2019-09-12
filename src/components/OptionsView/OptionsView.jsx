import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import withSecondaryView from '../SecondaryView';
import DataEditView from '../DataEditView';

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
				<Tabs className="options__tabbed-views">
					<TabList>
						<Tab>Data</Tab>
						<Tab>Options</Tab>
					</TabList>

					<TabPanel>
						<DataEditView />
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