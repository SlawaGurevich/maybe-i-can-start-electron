import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SpinningView from '../SpinningView';
import { SelectorView, EmptySelectorView } from '../SelectorView';
import { D_getAllOptions, D_getAllMembers } from '../../utils/dbService';
import { Button } from 'antd';

import './MainView.scss';

export class MainView extends Component {
	constructor() {
		super();
		this.state = { view: "selection", selected: [], data: [], options: [] };
		this.getMembers = this.getMembers.bind(this);
		this.getOptions = this.getOptions.bind(this);
		this.switchToSpinView = this.switchToSpinView.bind(this);
	}

	switchToSpinView(e) {
		if( (e.keyCode === 32) || e === "clicked" ) {
			let dataTemp = []

			for (let checkbox of document.querySelectorAll(".checkbox-element.checked")) {
				dataTemp.push(this.state.data[parseInt(checkbox.dataset.id)]);
			}

			this.setState({ selected: dataTemp });
			document.removeEventListener("keydown", this.switchToSpinView, false);
			this.setState({"view": "spinner"});
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.switchToSpinView, false);
		this.getOptions();
		this.getMembers();
	}

	getOptions = async () => {
		let options = await D_getAllOptions();
		this.setState({ options });
	}

	getMembers = async () => {
		let members = await D_getAllMembers();
		this.setState({ data: members });
	}

	render() {
		return (
			<>
				<div id="main-view">
					<div id="logo-container">
						<img src={ process.env.PUBLIC_URL + "/micsLogo.svg"} alt="Maybe I can Start"/>
					</div>
					{ this.state.view === "selection" ? (this.state.data.length ? <div className="selector-container"><SelectorView data={this.state.data} /><SpinButton switch={ this.switchToSpinView } /></div> : <EmptySelectorView /> ) : <SpinningView data={ this.state.selected }/> }
				</div>
				<Link to="/options" className="button--options">
					<Button className="button--op" type="primary" icon="setting" size="large" theme="filled" />
				</Link>
			</>
		)
	}
}

export const SpinButton = (props) => {
	return <div id="spin-button">Press [space] to start.</div>;
}

export default MainView;