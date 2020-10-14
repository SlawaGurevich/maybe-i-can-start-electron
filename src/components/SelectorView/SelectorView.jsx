import React from 'react';
import styled, { keyframes } from 'styled-components';

import { fadeInUp } from 'react-animations';

import { withStore } from '../../context/OptionContext';
import PeopleSelector from '../PeopleSelector';

const FadeInUp = styled.div`animation: 1s ${keyframes `${fadeInUp}`}`;

const SelectorView = (props) => {
	return(
		<FadeInUp>
			  { props.store.get("members") ? <PeopleSelector /> : "No data loaded!" }
		</FadeInUp>
	)
}

export default withStore(SelectorView);