import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { withStore } from '../../context/OptionContext';
import { D_getAllMembers } from '../../utils/dbService';

import { Button } from 'antd';

import Spinner from '../Spinner';
import SelectorView, { EmptySelectorView } from '../SelectorView';

import './MainView.scss';

const FadeIn = styled.div`animation: 1.5s ${keyframes `${fadeIn}`}`;

export class MainView extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [], options: [] };
		this.getMembers = this.getMembers.bind(this);
		this.switchToSpinView = this.switchToSpinView.bind(this);
	}

	switchToSpinView(e) {
		if ( (e.keyCode === 32 || e === "clicked" ) && !this.props.store.get("selected") ) {
			console.log("f:switchToSpinView: selected", this.props.store.get("selected") );
			let dataTemp = []

			for (let checkbox of document.querySelectorAll(".checkbox-element.checked")) {
				dataTemp.push(this.props.store.get("members")[parseInt(checkbox.dataset.id)]);
			}

			this.props.store.set("selected", dataTemp );
		}
	}

	componentDidMount() {
		document.addEventListener("keydown", this.switchToSpinView, false);
		this.getMembers();
	}

	getMembers = async () => {
		let members = await D_getAllMembers();
		this.props.store.set("members", members);
	}

	render() {
		return (
			<>
				<div id="main-view">
					<div id="logo-container">
						<img src={ process.env.PUBLIC_URL + "/micsLogo.svg"} alt="Maybe I can Start"/>
					</div>

					{
						this.props.store.get("members") ?
							this.props.store.get("selected") ? <Spinner /> :
								<div className="selector-container">
									<SelectorView />
									<SpinButton switch={ this.switchToSpinView } />
								</div> :
							<EmptySelectorView />
					}

				</div>
				<Link to="/options" className="button--options">
					<Button className="button--op" type="primary" icon="setting" size="large" theme="filled" />
				</Link>
			</>
		)
	}
}

export const SpinButton = (props) => {
	return <FadeIn><div id="spin-button">Press [space] to start.</div></FadeIn>;
}

export default withStore(MainView);