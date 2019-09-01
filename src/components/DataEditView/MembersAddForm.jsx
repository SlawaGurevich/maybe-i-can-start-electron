import React, { Component } from 'react';
import { D_addMember } from '../../utils/dbService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import dummyImage from '../../assets/Question.png'; // remove

const INITIAL_STATE = {
	name: '',
	role: '',
	picture: '',
	error: null
}

class MembersAddForm extends Component {
	constructor(props) {
		super(props);

		this.getData = props.getData;
		this.state = { ...INITIAL_STATE };
	}

	onSubmit = event => {
		D_addMember( "", this.state.name, this.state.role ).then(
			() => {
				this.setState({ ...INITIAL_STATE });
				this.getData();
			}
		);

		event.preventDefault();
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const {
			name,
			picture,
			role
		} = this.state;

		const isInvalid =
			name === '' ||
			role === 'norole' ||
			role === '';

		return (
			<form className="data__line--wrapper" onSubmit={this.onSubmit}>
				<div className="data__line">
					<div className="data__line--inner data__line--picture">
						<div className="data__line--label">
							Picture
						</div>
						<div className="data__line--value">
							{ <img src={dummyImage} alt="Dummy" /> }
						</div>
					</div>
					<div className="data__line--inner data__line--name">
						<div className="data__line--label">
							Name
						</div>
						<div className="data__line--value">
							<input
								name="name"
								value={name}
								onChange={this.onChange}
								type="text"
								placeholder="Name"
							/>
						</div>
					</div>
					<div className="data__line--inner data__line--role">
						<div className="data__line--label">
							Role
						</div>
						<div className="data__line--value">
							<select
								name="role"
								value={role}
								onChange={this.onChange}
								type="role"
								placeholder="Role"
							>
								<option value="norole" defaultValue>Please select...</option>
								{ this.props.roles.map( (role, key) => (
									<option key={key} value={role.name}>{role.name}</option>
								) ) }
							</select>
						</div>
					</div>
				</div>
				<div className="data__line--button">
					<button className="data__line--button-add" disabled={isInvalid} type="submit">
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
			</form>
		);
	}
}

export default MembersAddForm;