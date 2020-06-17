import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

class FuseAuthorization extends Component {
	constructor(props, context) {
		super(props);
		const { routes } = context;
		this.state = {
			accessGranted: false,
			routes
		};
	}

	componentDidMount() {
		if (!this.state.accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { location, userRole } = props;
		const { pathname } = location;

		const matched = matchRoutes(state.routes, pathname)[0];

		return {
			accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : true
		};
	}

	redirectRoute() {
		const { userRole, history } = this.props;

		if (!userRole || userRole.length === 0) {
			history.push({
				pathname: '/auth/login'
			});
		}
	}

	render() {
		return this.state.accessGranted ? <>{this.props.children}</> : null;
	}
}

const mapStateToProps = ({ auth }) => {
	return {
		userRole: auth.user.role
	};
};

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
