import React, { Component } from 'react';
import { D_addMember } from '../../utils/dbService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import dummyImage from '../../assets/Question.png'; // remove
import fs from 'fs-extra';
import path from 'path';

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

		this.getData = props.getData;
		console.log("dummy", dummyImage);
		this.state = { ...INITIAL_STATE };
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
		console.log(filePath);
		if (filePath[0] !== undefined) {
			this.setState({
				oldImagePath: filePath[0],
				newImagePath: app.getPath('userData') + '/userImages/' + path.basename(filePath[0])
			});
			console.log(this.state);
		}
	}

	onSubmit = event => {
		fs.copy(this.state.oldImagePath, this.state.newImagePath)
			.then( () => {
				D_addMember( this.state.newImagePath, this.state.name, this.state.role ).then(
					() => {
						this.setState({ ...INITIAL_STATE });
						this.getData();
					}
				);
			} )
			.catch( err => console.log("There has been an error copying the image!", err) );

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
					<div onClick={this.selectImage} className="data__line--inner data__line--picture">
						<div className="data__line--label">
							Picture
						</div>
						<div className="data__line--value">
							{ <img className="data__line--select-image" src={ this.state.oldImagePath ? "file://" + this.state.oldImagePath : dummyImage } alt="Dummy" /> }
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