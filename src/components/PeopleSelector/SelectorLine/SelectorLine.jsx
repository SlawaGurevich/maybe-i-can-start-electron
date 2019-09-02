import React from 'react';
import usableIcons from '../../../utils/usableIcons';

import './SelectorLine.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SelectorLine = ( props ) => {
	const toggleCheckbox = (e) => {
		console.log(e);
		if ( e.currentTarget.querySelector('.checkbox-element').classList.contains("checked") ) {
			e.currentTarget.querySelector('.checkbox-element').classList.remove("checked");
		} else {
			e.currentTarget.querySelector('.checkbox-element').classList.add("checked");
		}
	}

	const getIcon = () => {
		return usableIcons[props.roleObj.icon];
	}

	return (
		<div className={ "member-checkbox member-" + props.role } onClick={toggleCheckbox} >
			<div data-id={ props.uid } data-name={ props.name } data-role={ props.role } data-picture={ props.picture } className="checkbox-element checked" id={"checkbox-" + props.name}>
			</div>
			<div className="checkbox-label" id="checkbox-label-Rok">{ props.name }</div>
			<div className="role"><FontAwesomeIcon icon={getIcon()} /></div>
		</div>
	)
}

export default SelectorLine