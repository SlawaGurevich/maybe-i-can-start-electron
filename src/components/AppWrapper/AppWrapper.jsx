import React, { useEffect } from 'react';

import { HashRouter as Router, Route } from 'react-router-dom';
import { D_getOption } from '../../utils/dbService';
import * as ROUTES from '../../constants/routes';

import { withStore } from '../../context/OptionContext';

import { Icon } from 'antd';

import MainView from '../MainView';
import OptionsView from '../OptionsView'

import './AppWrapper.scss';

const TitleBar = () => {
	return (
		<div id="title-bar"></div>
	)
}

const LoadingSpinner = () => {
	return (
		<div id="main-view" className="loading-screen">
			<Icon type="loading" />
		</div>
	)
}

let backgroundColor, backgroundImage = undefined;

const AppWrapper = (props) => {
	const getBgFromDB = async function () {
		try {
			backgroundColor = await D_getOption("optionBgColor");
			backgroundImage = await D_getOption("optionBgImage");

			props.store.set("optionBgImage", backgroundImage ? backgroundImage.value : undefined );
			props.store.set("optionBgColor", backgroundColor ? backgroundColor.value : "gray");
		} catch (err) {
			console.log("Couldn't get bgColor from the database.", err)
		};
	}

	useEffect(() => {
		getBgFromDB();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  	}, []);

	return (
		<>
			<div id="app-wrapper" style={ props.store.get('optionBgImage') ? { "background": `url("file://${props.store.get('optionBgImage')}")` } : { "backgroundColor": props.store.get("optionBgColor") }}>
			{ props.store.get("optionBgImage") || props.store.get("optionBgColor") ?
				<Router>
					<Route exact path={ROUTES.HOME} component={MainView} />
					<Route path={ROUTES.OPTIONS} component={OptionsView} />
				</Router>
			: <LoadingSpinner /> }
			 </div>
			<TitleBar />
		</>
	)
}

export default withStore(AppWrapper);