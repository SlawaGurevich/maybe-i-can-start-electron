import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SpinningView from '../SpinningView';
import { RouletteView, EmptyRouletteView } from '../RouletteView';
import { D_getAllOptions, D_getAllMembers } from '../../utils/dbService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

import './MainView.scss';

// import PeopleSelector from '../PeopleSelector';

export class MainView extends Component {
	constructor() {
		super();
		this.state = { view: "selection", data: [], options: [] };
		this.switchToSpinView = this.switchToSpinView.bind(this);
	}

	switchToSpinView(e) {
		if( e.keyCode === 32 ) {
			console.log("start spin");
			let checkboxes = document.getElementsByClassName("checkbox-element");
			let data = []

			for (var i = 0; i < checkboxes.length; i++) {
				if( checkboxes[i].classList.contains("checked") ){
					data.push({ "id":checkboxes[i].dataset.id, "name":checkboxes[i].dataset.name, "role": checkboxes[i].dataset.role, "picture": checkboxes[i].dataset.picture })
				}
			}

			this.data = data;
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
					<img src={ process.env.PUBLIC_URL + "/micsLogo.svg"} alt="Maybe I can Start"/> <button onClick={ () => console.log(this.state.data, this.state.data.length ) }>Button</button>
					<p>{ this.state.data.length ? this.state.data[0].name : "NO DATA!!!" }</p>
				</div>
				{ this.state.view === "selection" ? (this.state.data.length ? <RouletteView data={this.state.data} /> : <EmptyRouletteView /> ) : <SpinningView data={ this.data }/> }
			</div>
			<Link to="/options" className="button--options"><FontAwesomeIcon icon={faCogs} /></Link>
			</>
		)
	}
}

export default MainView