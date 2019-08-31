import React, { Component } from 'react';
import { D_addMember, D_deleteMember } from '../../utils/dbService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import dummyImage from '../../assets/Question.png'; // remove

const INITIAL_STATE = {
	id: null,
	name: '',
	role: '',
	picture: '',
	error: null
}

class MembersAddForm extends Component {
	constructor(props) {
		super(props);

		this.getMembers = props.getMembers;
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		D_addMember( "", this.state.name, this.state.role );
		this.setState({ ...INITIAL_STATE });
		this.getMembers();
		event.preventDefault();
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const {
			id,
			name,
			picture,
			role
		} = this.state;

		const isInvalid =
			name === '' ||
			role === '';

		return (
			<form className="member__line--wrapper" onSubmit={this.onSubmit}>
				<div className="member__line">
					<div className="member__line--inner member__line--picture">
						<div className="member__line--label">
							Picture
						</div>
						<div className="member__line--value">
							{ <img src={dummyImage}/> }
						</div>
					</div>
					<div className="member__line--inner member__line--name">
						<div className="member__line--label">
							Name
						</div>
						<div className="member__line--value">
							<input
								name="name"
								value={name}
								onChange={this.onChange}
								type="text"
								placeholder="Name"
							/>
						</div>
					</div>
					<div className="member__line--inner member__line--role">
						<div className="member__line--label">
							Role
						</div>
						<div className="member__line--value">
							<input
								name="role"
								value={role}
								onChange={this.onChange}
								type="role"
								placeholder="Role"
							/>
						</div>
					</div>
				</div>
				<div className="member__line--button">
					<button className="member__line--button-add" disabled={isInvalid} type="submit">
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
			</form>
		);
	}
}

export default MembersAddForm;