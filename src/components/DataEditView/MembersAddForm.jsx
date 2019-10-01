import React, { Component, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import fs from 'fs-extra';
import path from 'path';

import Icon from '@pluralsight/ps-design-system-icon/react'
import Button from '@pluralsight/ps-design-system-button/react'
import Avatar from '../Avatar';
import usableIcons from '../../utils/usableIcons';

const electron = require('electron');
const app = electron.remote.app;
const { dialog } = require('electron').remote;

const INITIAL_STATE = {
	name: '',
	role: '',
	picture: '',
	error: null,
	oldImagePath: '',
	newImagePath: '',
}

class MembersAddForm extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };

		this.selectImage = this.selectImage.bind(this);
		this.getImagePath = this.getImagePath.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.addMember = props.addMember;
	}

	selectImage = () => {
		dialog.showOpenDialog({
					properties: ['openFile'],
          			filters: [
          				{
 		            		name: 'Images',
        		     		extensions: ['jpg', 'png', 'gif']
          				}
          			]
       }, this.getImagePath ).catch( err => console.log(err) );
	}

	getImagePath = (filePath) => {
		if (filePath[0] !== undefined) {
			this.setState({
				oldImagePath: filePath[0],
				newImagePath: app.getPath('userData') + '/userImages/' + path.basename(filePath[0])
			});
		}
	}

	onSubmit = event => {
		if (this.state.oldImagePath) {
			fs.copy(this.state.oldImagePath, this.state.newImagePath)
				.then( () => {
					this.addMember( this.state.newImagePath, this.state.name, this.state.role ).then(
						() => {
							this.setState({ ...INITIAL_STATE });
						}
					);
				} )
				.catch( err => console.log("There has been an error copying the image!", err) );
		} else {
			this.addMember( this.dummyImagePath, this.state.name, this.state.role ).then(
				() => {
					this.setState({ ...INITIAL_STATE });
				}
			);
		}

		event.preventDefault();
	}

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const {
			name,
			role
		} = this.state;

		const isInvalid =
			name === '' ||
			role === 'norole' ||
			role === '';

		return (
			<form className="data__line--wrapper" onSubmit={this.onSubmit}>
				<div className="data__line">
					<div onClick={this.selectImage} className="data__line--inner data__line--picture">
						<div className="data__line--label">
							Picture
						</div>
						<div className="data__line--value data__line--select-image">
							{ this.state.oldImagePath ? <div className="data__line--picture-container" style={{backgroundImage: `url('file:${this.state.oldImagePath}')`}} ></div> : <div className="data__line--icon"><FontAwesomeIcon icon={faPlus} /></div> }
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
									<option key={key} value={role._id}>{role.name}</option>
								) ) }
							</select>
						</div>
					</div>
				</div>
				<div className="data__line--button">
					<Button icon={<Icon id={Icon.ids.plus} />} disabled={isInvalid} title="DeleteMember" type="submit"/>
				</div>
			</form>
		);
	}
}

const MemberLine = ( props ) => {
	const [roleIcon, setRoleIcon] = useState('');
	const [roleName, setRoleName] = useState('');

	function deleteMember() {
		props.deleteMember(props.name);
		if( fs.existsSync(props.picture) ) {
			try {
				fs.unlink(props.picture);
			} catch (e) {
				console.log("Couldn't delete picture.", e);
			}
		}
		props.getData();
	}

	useEffect(() => {
		const getRole = async (id) => {
			const role = await props.getRole(id);
			if( role ) {
				setRoleIcon( usableIcons[parseInt(role.icon)] );
				setRoleName( role.name );
			}
		}

		getRole(props.role);
	}, [props]);


	return(
		<div className="data__line--wrapper">
			<div className="data__line">
				<div className="data__line--inner data__line--picture">
					<div className="data__line--value">
						{ props.picture ? <div className="data__line--picture-container" style={{backgroundImage:`url('file:${props.picture}')`}}></div> : <div className="data__line--picture-container no-picture"><Avatar name={ props.name } /></div> }
					</div>
				</div>
				<div className="data__line--inner data__line--name">
					<div className="data__line--value">
						{props.name}
					</div>
				</div>
				<div className="data__line--inner data__line--role">
					<div className="data__line--value">
						<div className="data__line--icon">
							{ roleIcon ? <FontAwesomeIcon icon={roleIcon} /> : '' }
						</div>
						<div className="data__line--icon-text">
							{roleName}
						</div>
					</div>
				</div>
			</div>
			<div className="data__line--button">
				<Button icon={<Icon id={Icon.ids.trash} />} title="DeleteMember" onClick={deleteMember}/>
			</div>
		</div>
	);
}

export default MembersAddForm;
export { MemberLine };
