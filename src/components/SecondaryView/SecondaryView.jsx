import React from 'react';
import { Link } from 'react-router-dom';
import './SecondaryView.scss';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { Button } from 'antd';

const FadeIn = styled.div`display: flex; width:100%; height: 100%; overflow: hidden; animation: 1s ${keyframes `${fadeIn}`}`;

const withSecondaryView = Component => {
	return class extends Component {
		render() {
			return (
				<>
					<div className="secondary-screen">
						<FadeIn>
							<Component {...this.props}/>
						</FadeIn>
					</div>
					<Link to="/" className="button--close">
						<Button icon="close" type="primary" size="large" theme="filled" />
					</Link>
				</>
			)
		}
	}
}

export default withSecondaryView;