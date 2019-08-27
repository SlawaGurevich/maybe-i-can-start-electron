import React from 'react';
import { fadeInUp } from 'react-animations';
import styled, { keyframes } from 'styled-components';

import PeopleSelector from '../PeopleSelector';

const FadeInUp = styled.div`animation: 1s ${keyframes `${fadeInUp}`}`;

export const RouletteView = () => {
	return(
		<FadeInUp><PeopleSelector /></FadeInUp>
	)
}

export default RouletteView;