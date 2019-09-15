import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SpinningView from '../SpinningView';
import { SelectorView, EmptySelectorView } from '../SelectorView';
import { D_getAllOptions, D_getAllMembers } from '../../utils/dbService';
import Icon from '@pluralsight/ps-design-system-icon/react'
import Button from '@pluralsight/ps-design-system-button/react'


import './MainView.scss';

// import PeopleSelector from '../PeopleSelector';

export class MainView extends Component {
	constructor() {
		super();
		this.state = { view: "selection", selected: [], data: [], options: [] };
		this.getMembers = this.getMembers.bind(this);
		this.getOptions = this.getOptions.bind(this);
		this.switchToSpinView = this.switchToSpinView.bind(this);
	}

	switchToSpinView(e) {
		if( e.keyCode === 32 ) {
			let dataTemp = []

			for (let checkbox of document.querySelectorAll(".checkbox-element.checked")) {
				dataTemp.push(this.state.data[parseInt(checkbox.dataset.id)]);
			}

			this.setState({ selected: dataTemp });
			document.removeEventListener("keydown", this.switchToSpinView, false);
			this.setState({"view": "spinner"});
		}
	}

	componentDidMount(){
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
				{ this.state.view === "selection" ? (this.state.data.length ? <SelectorView data={this.state.data} /> : <EmptySelectorView /> ) : <SpinningView data={ this.state.selected }/> }
			</div>
			<Link to="/options" className="button--options">
				<Button class="button--op" icon={<Icon id={Icon.ids.gear} />} title="DeleteMember" type="submit"/>
			</Link>
			</>
		)
	}
}

export default MainView