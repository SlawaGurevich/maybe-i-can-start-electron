import React, { Component } from 'react';
import { Tabs, Icon } from 'antd';

import withSecondaryView from '../SecondaryView';
import DataEditView from '../DataEditView';
import SettingsView from '../SettingsView';

import './OptionsView.scss';

class OptionsView extends Component {
	state = {
		selectedKey: 'home'
	}

	handleTabChange = (evt, key) => {
		this.setState({selectedKey: key});
	}

	render() {
		const { TabPane } = Tabs;
		return(
			<Tabs className="options__tabbed-views">
				<TabPane tab={
					<span>
						<Icon type="database" />
						Edit Data
					</span>
				} key="1">
					<DataEditView />
				</TabPane>

				<TabPane tab={
					<span>
						<Icon type="setting" />
						Settings
					</span>
				} key="2">
					<SettingsView className="Settingsview" />
				</TabPane>
			</Tabs>
		);
	}
}

export default withSecondaryView(OptionsView);