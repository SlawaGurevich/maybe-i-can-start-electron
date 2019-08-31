import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import dummyImage from '../../assets/Question.png';
import './MembersEditView.scss';

const MemberLine = ( props ) => {
	function deleteMember() {
		props.deleteMember(props.name);
		props.getMembers();
	}

	return(
		<div className="member__line--wrapper">
			<div className="member__line">
				<div className="member__line--inner member__line--picture">
					<div className="member__line--label">
						Picture
					</div>
					<div className="member__line--value">
						{ props.picture ? <img src="" alt=""/> : <img src={dummyImage} alt={props.name}/> }
					</div>
				</div>
				<div className="member__line--inner member__line--name">
					<div className="member__line--label">
						Name
					</div>
					<div className="member__line--value">
						{props.name}
					</div>
				</div>
				<div className="member__line--inner member__line--role">
					<div className="member__line--label">
						Role
					</div>
					<div className="member__line--value">
						{props.role}
					</div>
				</div>
			</div>
			<div className="member__line--button">
				<button className="member__line--button-delete" onClick={deleteMember}><FontAwesomeIcon icon={faTrash} /></button>
			</div>
		</div>
	);
}

export default MemberLine;