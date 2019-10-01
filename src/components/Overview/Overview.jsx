import React, { Component } from 'react';
import Avatar from '../Avatar';

import './Overview.scss';

class Overview extends Component {
	constructor (props){
		super(props);
		this.originalData = props.data;
		this.state = {
			data: props.data,
			originalData: [...props.data],
		}
	}

	render() {
		return (
			<div className="overview">
				{ this.state.originalData.map( (member, key) => (
					<div key={ key } className={`overview__member-icon ${ !this.state.data.includes(member) ? 'faded' : '' }`}>
						<div className="overview__member-picture" style={ member.picture ? { backgroundImage: `url('file://${ member.picture }')` } : {} }>
							{ member.picture ? '' : <Avatar name={ member.name } /> }
						</div>
					</div>
				) ) }
			</div>
		)
	}
}

export default Overview;