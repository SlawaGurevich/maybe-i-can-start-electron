import React from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';

import PeopleSelector from '../PeopleSelector';

const FadeInUp = styled.div`animation: 1s ${keyframes `${fadeInUp}`}`;

export const SelectorView = (props) => {
	return(
		<FadeInUp>
			{ props.data ? <PeopleSelector data={props.data} /> : "No data loaded!" }
		</FadeInUp>
	)
}

export default SelectorView;