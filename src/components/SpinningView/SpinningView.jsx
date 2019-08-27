import React, { Component } from 'react';

import Spinner from "./Spinner";
import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';

const FadeInUp = styled.div`animation: 1s ${keyframes `${fadeInUp}`}`;

export class SpinningView extends Component {
	render() {
		const { data } = this.props;
		return(
			<FadeInUp><Spinner data={ data } /></FadeInUp>
		)
	}
}

export default SpinningView;