import React, { Component } from 'react';
import './MainView.scss';
import RouletteView from '../RouletteView';
import SpinningView from '../SpinningView';

// import PeopleSelector from '../PeopleSelector';

export class MainView extends Component {
	data = []
	
	constructor() {
		super();
		this.state = { "view": "selection" };
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
	}

	render() {
		return (
			<div id="main-view">
				<div id="logo-container">
					<img src={ process.env.PUBLIC_URL + "/micsLogo.svg"} alt="Maybe I can Start"/>
				</div>
				{ this.state.view === "selection" ? <RouletteView /> : <SpinningView data={ this.data }/> }
			</div>
		)
	}
}

export default MainView