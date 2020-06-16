import { authRoles } from 'app/auth';
import Dashboard from './Dashboard';

const DashboardConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.customer,
	routes: [
		{
			path: '/dashboard',
			component: Dashboard
		}
	]
};

export default DashboardConfig;
