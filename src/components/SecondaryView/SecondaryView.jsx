import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SecondaryView.scss';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FadeIn = styled.div`display: flex; width:100%; height: 100%; overflow: hidden; animation: 1s ${keyframes `${fadeIn}`}`;

const withSecondaryView = Component => {
	return class extends Component {
		render() {
			return (
				<>
					<div className="secondary-screen">
						<FadeIn>
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