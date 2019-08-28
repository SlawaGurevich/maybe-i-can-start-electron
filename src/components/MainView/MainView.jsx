import React, { Component } from 'react';
import './MainView.scss';
import RouletteView from '../RouletteView';
import SpinningView from '../SpinningView';
import { getAllOptions, getAllMembers } from '../../utils/dbService';

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
					data.push({ "id":checkboxes[i].dataset.id, "name":checkboxes[i].dataset.name, "role": checkboxes[i].dataset.role })
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
		let options = await getAllOptions();
		this.setState({ options });
	}

	getMembers = async () => {
		let members = await getAllMembers();
		this.setState({ data: members });
	}

	render() {
		return (
			<div id="main-view">
				<div id="logo-container">
					<img src={ process.env.PUBLIC_URL + "/micsLogo.svg"} alt="Maybe I can Start"/> <button onClick={ () => console.log(this.state.data, this.state.data.length ) }>Button</button>
					<p>{ this.state.data.length ? this.state.data[0].name : "NO DATA!!!" }</p>
				</div>
				{ this.state.view === "selection" ? (this.state.data.length ? <RouletteView data={this.state.data} /> : "Loading data..." ) : <SpinningView data={ this.data }/> }
			</div>
		)
	}
}

export default MainView