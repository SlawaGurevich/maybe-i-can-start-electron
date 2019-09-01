import React from 'react';
import usableIcons from '../../../utils/usableIcons';

import './SelectorLine.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SelectorLine = ({ uid, name, role, roleObj }) => {
	const toggleCheckbox = (e) => {
		console.log(e);
		if ( e.currentTarget.querySelector('.checkbox-element').classList.contains("checked") ) {
			e.currentTarget.querySelector('.checkbox-element').classList.remove("checked");
		} else {
			e.currentTarget.querySelector('.checkbox-element').classList.add("checked");
		}
	}

	const getIcon = () => {
		return usableIcons[roleObj.icon];
	}

	return (
		<div className={ "member-checkbox member-" + role } onClick={toggleCheckbox} >
			<div data-id={ uid } data-name={ name } data-role={ role } className="checkbox-element checked" id={"checkbox-" + name}>
			</div>
			<div className="checkbox-label" id="checkbox-label-Rok">{ name }</div>
			<div className="role"><FontAwesomeIcon icon={getIcon()} /></div>
		</div>
	)
}

export default SelectorLine