import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import usableIcons from '../../utils/usableIcons';

import dummyImage from '../../assets/Question.png';
import './DataEditView.scss';

const MemberLine = ( props ) => {
	function deleteMember() {
		props.deleteMember(props.name);
		props.getData();
	}

	const getIcon = () => {
		return usableIcons[props.roleObj.icon];
	}

	return(
		<div className="data__line--wrapper">
			<div className="data__line">
				<div className="data__line--inner data__line--picture">
					<div className="data__line--label">
						Picture
					</div>
					<div className="data__line--value">
						{ props.picture ? <img src={`file://${props.picture}`} alt={props.name}/> : <img src={dummyImage} alt={props.name}/> }
					</div>
				</div>
				<div className="data__line--inner data__line--name">
					<div className="data__line--label">
						Name
					</div>
					<div className="data__line--value">
						{props.name}
					</div>
				</div>
				<div className="data__line--inner data__line--role">
					<div className="data__line--label">
						Role
					</div>
					<div className="data__line--value">
						{props.role}
						<div className="data__line--icon">
							<FontAwesomeIcon icon={getIcon()} />
						</div>
					</div>
				</div>
			</div>
			<div className="data__line--button">
				<button className="data__line--button-delete" onClick={deleteMember}><FontAwesomeIcon icon={faTrash} /></button>
			</div>
		</div>
	);
}

export default MemberLine;