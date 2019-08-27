import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import db from '../Database/database.sqlite';

export class DatabaseService extends Component {
	state = {
		db: null
	}
	
	constructor() {
		super()
		const micsDb = new PouchDB("mics");
		micsDb.put({
			_id: "1",
			name: "Slawa",
			role: "Dev"
		})

		micsDb.changes().on('change', function() {
			micsDb.get("1").then(function(docs) {
				console.log(docs)
			}).catch(function (err) {
			  console.log(err);
			});
		});

		this.state = {
			db: micsDb
		};
		console.log(this.state);
	}

	componentDidMount() {
		console.log()
		// this.state.db.info().then(function (info) {
		//   console.log(info);
		// })
	}
	
	render() {
		
		return (
			<div>This is a { db }</div>	
		)
	}
}

export default DatabaseService