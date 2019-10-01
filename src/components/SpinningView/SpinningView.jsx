import React, { Component } from 'react';

import Spinner from "./Spinner";

export class SpinningView extends Component {
	render() {
		const { data } = this.props;
		return(
			<>
				<Spinner data={ data } />
			</>
		)
	}
}

export default SpinningView;