import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import usableIcons from '../../utils/usableIcons';

import './DataEditView.scss';

const INITIAL_STATE = {
	id: null,
	name: '',
	icon: 0,
	error: null
}

const RoleLine = (props) => {
	function deleteRole() {
		props.deleteRole(props.name);
		props.getData();
	}

	function getIcon() {
		return usableIcons[props.icon];
	}

	return(
		<div className="data__line--wrapper">
			<div className="data__line">
				<div className="data__line--inner">
					<div className="data__line--label">
						Icon
					</div>
					<div className="data__line--value data__line--icon">
						<FontAwesomeIcon icon={getIcon()} />
					</div>
				</div>
				<div className="data__line">
					<div className="data__line--inner data__line--name">
						<div className="data__line--label">
							Name
						</div>
						<div className="data__line--value">
							{props.name}
						</div>
					</div>
				</div>
				<div className="data__line--button">
					<button className="data__line--button-delete" onClick={deleteRole}><FontAwesomeIcon icon={faTrash} /></button>
				</div>
			</div>
		</div>
	)
}

class RoleAddForm extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };

		this.addRole = props.addRole;
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.showIconMenu = this.showIconMenu.bind(this);
		this.selectedIcon = this.selectedIcon.bind(this);
	}

	onSubmit = event => {
		this.addRole( this.state.name, this.state.icon );
		this.setState({ ...INITIAL_STATE });
		event.preventDefault();
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	showIconMenu = (e) => {
		document.getElementById('visible-dropdown').classList.toggle('visible');
		console.log(e.target);
	}

	selectedIcon = (e) => {
		document.getElementById('icon-select').value = e.target.dataset.value;
		document.getElementById('visible-dropdown').classList.remove('visible');
		this.setState({icon: e.target.dataset.value});
	}

	render() {
		const {
			name,
			icon,
		} = this.state;

		const isInvalid =
			name === '' ||
			icon === '';

		return(
			<form className="data__line--wrapper" onSubmit={this.onSubmit}>
				<div className="data__line">
					<div className="data__line--inner">
						<div className="data__line--label">
							Icon
						</div>
						<div className="data__line--value">
							<select
								hidden
								id="icon-select"
								name="icon"
								value={icon}
								onChange={this.onChange}
								type="text"
								placeholder="Icon"
							>
								{ usableIcons.map((icon, index) => (
									<option key={index} value={index}>{icon.iconName}</option>
								) ) }
							</select>
							<div className="data__line--visible-dropdown">
								<div className="data__line--icon data__line--visible-dropdown-selected" onClick={this.showIconMenu}>
									<FontAwesomeIcon icon={usableIcons[this.state.icon]} />
								</div>
								<div id="visible-dropdown" className="data__line--visible-dropdown-options">
									{ usableIcons.map((icon, index) => (
										<div className="data__line--visible-dropdown-icon data__line--icon" key={index} onClick={this.selectedIcon} data-value={index}><FontAwesomeIcon icon={icon} /></div>
									) ) }
								</div>
							</div>
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
					<div className="data__line--button">
						<button className="data__line--button-add" disabled={isInvalid} type="submit">
							<FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</div>
			</form>
		)
	}
}

export default RoleAddForm;
export { RoleLine };
