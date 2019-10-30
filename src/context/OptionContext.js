import React from 'react'

const OptionContext = React.createContext()
const createStore = WrappedComponent => {
	return class extends React.Component {
		state = {
			get: key => {
				console.log("Get state ", key);
				return this.state[key]
			},
			set: (key, value) => {
				const state = this.state;
				state[key] = value;
				console.log("Set state ", key, value);
				this.setState(state);
			},
			remove: key => {
				const state = this.state
				delete state[key]
				this.setState(state)
			}
		}
		render() {
			return (
				<OptionContext.Provider value={this.state}>
				<WrappedComponent {...this.props} />
				</OptionContext.Provider>
				)
		}
	}
}
const withStore = WrappedComponent => {
	return class extends React.Component {
		render() {
			return (
				<OptionContext.Consumer>
				{context => <WrappedComponent store={context} {...this.props} />}
				</OptionContext.Consumer>
				)
		}
	}
}

export { createStore, withStore }