import React, { useState, useEffect } from 'react';
import usableIcons from '../../../utils/usableIcons';
import { D_getRole } from '../../../utils/dbService';

import './SelectorLine.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SelectorLine = ( props ) => {
	const [roleIcon, setRoleIcon] = useState('');

	useEffect(() => {
		const getRole = async (id) => {
			const role = await D_getRole(id);
			if( role ) {
				setRoleIcon( usableIcons[parseInt(role.icon)] );
			}
		}

		getRole(props.role);
	}, [props]);



	const toggleCheckbox = (e) => {
		if ( e.currentTarget.querySelector('.checkbox-element').classList.contains("checked") ) {
			e.currentTarget.querySelector('.checkbox-element').classList.remove("checked");
		} else {
			e.currentTarget.querySelector('.checkbox-element').classList.add("checked");
		}
	}

	return (
		<div className={ "member-checkbox member-" + props.role } onClick={toggleCheckbox} >
			<div data-id={ props.uid } className="checkbox-element checked" id={"checkbox-" + props.name}>
			</div>
			<div className="checkbox-label" id="checkbox-label-Rok">{ props.name }</div>
			<div className="role">{ roleIcon ? <FontAwesomeIcon icon={ roleIcon }/> : '' }</div>
		</div>
	)
}

export default SelectorLine