import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SecondaryScreen.scss';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FadeIn = styled.div`animation: 1s ${keyframes `${fadeIn}`}`;

const withSecondaryView = Component => {
	return class extends Component {
		render() {
			return (
				<>
					<div className="secondary-screen">
						<FadeIn>
							<Link className="close-to-home" to="/">To home</Link>
							<div className="container">
								<div className="row">
									<Component {...this.props}/>
								</div>
							</div>
						</FadeIn>
					</div>
					<Link to="/" className="button--close"><FontAwesomeIcon icon={faTimes} /></Link>
				</>
			)
		}
	}
}

export default withSecondaryView;