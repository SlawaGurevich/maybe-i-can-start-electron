import React, { Component } from 'react';

import './Spinner.scss';

import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const FadeIn = styled.div`animation: 1s ${keyframes `${fadeIn}`}`;

export class Spinner extends Component {

	spinningInterval;

	// set the inital data. Provided there are more then 2 people in the array.
	state = {
		"data":[],
		"spinning": false,
		"stopSpinning": false,
		"spinningOffset": 0,
		"currentId": 0,
		"nextId": 0,
		"downToLastPerson": false
	}

	// get the data from the parent and set it to the current state's data
	constructor(data) {
		super()
		this.state.data = data.data;
		this.startSpin = this.startSpin.bind(this);
		this.stopSpin = this.stopSpin.bind(this);
		this.updateState = this.updateState.bind(this);
		this.spinDatShit = this.spinDatShit.bind(this);
	}

	updateState(){
		let currentId, nextId
		currentId = this.state.currentId < (this.state.data.length - 1) ? this.state.currentId + 1 : 0;
		nextId = currentId < (this.state.data.length - 1) ? currentId + 1 : 0;

		this.setState({
			"currentId": currentId,
			"nextId": nextId,
		});
	}

	startSpin(e) {
		if( e.keyCode === 32 ) {
			if( this.state.currentId !== null && this.state.nextId !== null ) {
				// remove the name from the data, that was selected from the spinning
				this.state.data.splice(this.state.nextId, 1);

				if( this.state.data.length > 1 ) {
					this.updateState();
				}
			} else {
				this.setState({
					"currentId": 0,
					"nextId": 1,
				});
				console.log("setting id", this.state.currentId, this.state.nextId);
			}

			if( this.state.data.length < 2 ) {
				console.log("last person");
				this.lastPerson();
			} else {
				// set the state to spinning
				this.setState({ "spinning": true });

				// create the interval to animate the spinner
				this.spinningInterval = setInterval(this.spinDatShit, 10);
				// remove the event listener to prevent from restarting the spin
				document.removeEventListener("keydown", this.startSpin, false);
				// add event listener to stop the spin
				document.addEventListener("keydown", this.stopSpin, false);
			}
		}
	}

	stopSpin(e) {
		if(e.keyCode === 32 ) {
			// set the stopSpinning state
			this.setState({
				"stopSpinning": true,
				"spinning": false
			});

			// remove the event listener to stop the spin ...
			document.removeEventListener("keydown", this.stopSpin, false);
			// ... and add the event listener to start the spin again
			document.addEventListener("keydown", this.startSpin, false);
			console.log("callback: stopSpin(), ", this.state.spinning);
		}
	}

	spinDatShit() {
		// get all the lines, namely 2, from the spinner
		let lines = document.getElementsByClassName("name-line")

		// if the offset becomes 60, change the names before resetting it to 100
		if ( this.state.spinningOffset === 60 && this.state.stopSpinning === false) {
			this.updateState();
		}

		// set the offset to move the lines and simulate spinning, if it reaches 60 set it to 0, after the positions have been changed
		this.setState({"spinningOffset": this.state.spinningOffset === 60 ? 0 : this.state.spinningOffset + 4 });

		// the animation itself to simulate the spinning
		for (let i = 0; i < lines.length; i++) {
			lines[i].style.transform = `translateY(-${ this.state.spinningOffset }px)`
		}

		// if somewhere the stop has been triggered, wait for the animation to animate to 0 and then set stopSpinning to false
		if ( this.state.stopSpinning === true && this.state.spinningOffset === 60 ) {
			clearInterval(this.spinningInterval);

			this.setState({
				"stopSpinning": false,
			})
		}
	}

	lastPerson () {
		this.setState({
			"downToLastPerson": true
		});
	}

	componentDidMount(){
		this.setState({ "spinning": true });

		// create the interval to animate the spinner
		this.spinningInterval = setInterval(this.spinDatShit, 10);

		// add event listener to stop the spin
		document.addEventListener("keydown", this.stopSpin, false);
	}

	componentWillUnmount(){
	}

	render() {
		let spinnerView;
		if ( this.state.downToLastPerson ) {
			spinnerView = <FadeIn><div id="last-person"
							   className="last-person">
							   	<div className="first-line">Already Down to last Person...</div>
							   	<div id="last-spinner-image" style={{ backgroundImage: 'url("file://' + (this.state.data[0].picture ? this.state.data[0].picture : process.env.PUBLIC_URL + '/Question.png') + '")' }}>&nbsp;</div>
						  		<div id="last-spinner-line">{ this.state.data[0].name }</div>
						  </div></FadeIn>
		} else {
			spinnerView = <div>
		 		<div id="spinner-image" className={ this.state.nextId !== null && !this.state.spinning ? "visible" : "hidden" } style={{ backgroundImage: 'url("file://' + (this.state.data[this.state.nextId].picture ? this.state.data[this.state.nextId].picture : process.env.PUBLIC_URL + '/Question.png') + '")' }}></div>
				<div id="spinner"
					 className="spinner">
						<div id="name-line-first" data-id={ this.state.data[Number.isInteger(this.state.currentId) ? this.state.currentId : 0].id } className="name-line current">{ this.state.data[Number.isInteger(this.state.currentId) ? this.state.currentId : 0].name }</div>
						<div data-id={ this.state.data[Number.isInteger(this.state.nextId) ? this.state.nextId : 1].id } className="name-line next">{ this.state.data[Number.isInteger(this.state.nextId) ? this.state.nextId : 1].name }</div>
				</div>
			</div>
		}
		return (
			<div>
				{ spinnerView }
			</div>
		)
	}
}

export default Spinner;