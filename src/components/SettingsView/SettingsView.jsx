import React, { Component } from 'react';
import fs from 'fs-extra';
import path from 'path';

import { D_setOption, D_getOption, D_deleteOption } from '../../utils/dbService';
import { withStore } from '../../context/OptionContext';

import { Collapse, Button } from 'antd';
import { SliderPicker } from 'react-color';

import './SettingsView.scss';

const electron = require('electron');
const app = electron.remote.app;
const { dialog } = require('electron').remote;
const { Panel } = Collapse;

const EditImageButtons = (props) => {
	return (
		<>
			<Button type="primary" icon="edit" size="large" theme="filled" onClick={props.selectImage}/>
			<Button type="danger" icon="delete" size="large" theme="filled" onClick={props.deleteImage} />
		</>
	);
}

const SetImageButtons = (props) => {
	return (
		<Button onClick={ props.selectImage } type="primary" icon="plus" size="large" theme="filled" />
	)
}

export class SettingsView extends Component {
	constructor() {
		super();
		this.state = { optionBgColor:'' }
		this.selectImage = this.selectImage.bind();
		this.uploadImage = this.uploadImage.bind();
		this.deleteImage = this.deleteImage.bind();
		this.colorChangeComplete = this.colorChangeComplete.bind();
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
       }, this.uploadImage ).catch( err => console.log(err) );
	}

	uploadImage = (filePath) => {
		if (filePath[0] !== undefined) {
			let bgImage = this.props.store.get("optionBgImage");
			if( bgImage ) {
				this.deleteImage(bgImage);
			}

			let oldImagePath = filePath[0];
			let newImagePath = app.getPath('userData') + '/backgroundImages/' + path.basename(filePath[0]);

			if ( oldImagePath ) {
				fs.copy(oldImagePath, newImagePath)
					.then( () => {
						D_deleteOption("optionBgImage");
						D_setOption("optionBgImage", newImagePath);
						this.props.store.set("optionBgImage", newImagePath);
					} )
					.catch( (err) => {
						console.log("Couldn't copy image.", err);
					} );
			}
		} else {
			console.log("No image selected.")
		}
	}

	deleteImage = async () => {
		let imagePath = await D_getOption("optionBgImage");
		if ( imagePath.value && fs.exists( imagePath.value ) ) {
			try {
				fs.unlink(imagePath.value);
				D_deleteOption("optionBgImage");
				this.props.store.set("optionBgImage", undefined);
			} catch (err) {
				console.log("Couldn't delete image.", err)
			}
		}
	}

	colorChangeComplete = (color, event) => {
		try {
			D_setOption("optionBgColor", color.hex);
			this.props.store.set("optionBgColor", color.hex);
		} catch (err) {
			console.log("Couldn't set option.", err);
		}
	}

	render() {
	return(
		<div className="options__settings-list">
		<Collapse>
		<Panel className="options__settings-list--database" header="General" key="1">

		</Panel>
		<Panel className="options__settings-list--general" header="Customize" key="2" >
				<div className="options__settings-list--setting">
					<div className="options__settings-list--setting-label">
						<span>Background Color</span>
					</div>
					<div className="options__settings-list--setting-option">
						<SliderPicker color={ this.props.store.get("optionBgColor") } onChangeComplete={ this.colorChangeComplete } />
					</div>
				</div>

				<div className="options__settings-list--setting">
					<div className="options__settings-list--setting-label">
						<span>Background Image</span>
						<small>When you set an image, the background-color is ignored.</small>
					</div>
					<div className="options__settings-list--setting-option">
						<div className="options__settings-list--background-preview" style={ !this.props.store.get("optionBgImage") ? {"backgroundColor": this.props.store.get("optionBgColor"), "width": "100%"} : {}}>
							{ this.props.store.get("optionBgImage") ? <img className="preview-image" src={`file://${this.props.store.get("optionBgImage")}`} alt="Background"/> : <div className="options__settings-list--backgrond-preview-bg"></div> }
							<div className="options__settings-list--image-buttons">
								{ this.props.store.get("optionBgImage") ? <EditImageButtons selectImage={this.selectImage} deleteImage={this.deleteImage} /> : <SetImageButtons selectImage={this.selectImage} /> }
							</div>
						</div>
					</div>
				</div>
		</Panel>
		</Collapse>
		</div>
		);
	}
}

// class GeneralSettingsForm extends Component {
// 	handleSubmit = e => {
// 		e.preventDefault();
// 		this.props.form.validateFields((err, values) => {
// 			if (!err) {
// 				console.log('Received values of form: ', values);
// 			}
// 		});
// 	};

// 	render() {
// 		const { getFieldDecorator } = this.props.form;
// 		return (

// 		);
// 	}
// }


export default withStore(SettingsView);