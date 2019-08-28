import React from 'react';
import { fadeInUp } from 'react-animations';
import styled, { keyframes } from 'styled-components';

import PeopleSelector from '../PeopleSelector';

const FadeInUp = styled.div`animation: 1s ${keyframes `${fadeInUp}`}`;

export const RouletteView = (props) => {
	return(
		<FadeInUp>
			{ props.data ? <PeopleSelector data={props.data} /> : "No data loaded!" }
		</FadeInUp>
	)
}

export default RouletteView;