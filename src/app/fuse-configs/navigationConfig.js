import i18next from 'i18next';
import es from './navigation-i18n/es';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

const navigationConfig = [
	{
		id: 'menu_options',
		title: 'Menu',
		translate: 'OPTIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'dashboard',
				title: 'Dashboard',
				translate: 'DASHBOARD',
				type: 'item',
				icon: 'whatshot',
				url: '/dashboard'
			}
		]
	}
];

export default navigationConfig;
