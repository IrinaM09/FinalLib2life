export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Applications',
					root: true,
					alignment: 'left',
					toggle: 'click',
					submenu: [
						{
							title: 'eCommerce',
							bullet: 'dot',
							icon: 'flaticon-business',
							permission: 'accessToECommerceModule',
							submenu: [
								{
									title: 'Customers',
									page: '/ecommerce/customers'
								},
								{
									title: 'Products',
									page: '/ecommerce/products'
								},
							]
						},
						{
							title: 'User Management',
							bullet: 'dot',
							icon: 'flaticon-user',
							submenu: [
								{
									title: 'Users',
									page: '/user-management/users'
								},
								{
									title: 'Roles',
									page: '/user-management/roles'
								}
							]
						},
					]
				}
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon2-architecture-and-city',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
					bullet: 'dot',
				},
				{section: 'ADMINISTRATOR'},
				{
					title: 'Administrator',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					submenu: [
						{
							title: 'Manager de cărți',
							page: '/administrator'
						}
					]
				},
				{section: 'UTILIZATOR'},
				{
					title: 'Utilizator',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					submenu: [
						{
							title: 'Caută cărți',
							page: '/user'
						}
					]
				},
				{section: 'Applications'},
				{
					title: 'eCommerce',
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					root: true,
					permission: 'accessToECommerceModule',
					submenu: [
						{
							title: 'Customers',
							page: '/ecommerce/customers'
						},
						{
							title: 'Products',
							page: '/ecommerce/products'
						},
					]
				},
				{
					title: 'User Management',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-user-outline-symbol',
					submenu: [
						{
							title: 'Users',
							page: '/user-management/users'
						},
						{
							title: 'Roles',
							page: '/user-management/roles'
						}
					]
				},
				{section: 'Custom'},
				{
					title: 'Error Pages',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-list-2',
					submenu: [
						{
							title: 'Error 1',
							page: '/error/error-v1'
						},
						{
							title: 'Error 2',
							page: '/error/error-v2'
						},
						{
							title: 'Error 3',
							page: '/error/error-v3'
						},
						{
							title: 'Error 4',
							page: '/error/error-v4'
						},
						{
							title: 'Error 5',
							page: '/error/error-v5'
						},
						{
							title: 'Error 6',
							page: '/error/error-v6'
						},
					]
				},
				{
					title: 'Wizard',
					root: true,
					bullet: 'dot',
					icon: 'flaticon2-mail-1',
					submenu: [
						{
							title: 'Wizard 1',
							page: '/wizard/wizard-1'
						},
						{
							title: 'Wizard 2',
							page: '/wizard/wizard-2'
						},
						{
							title: 'Wizard 3',
							page: '/wizard/wizard-3'
						},
						{
							title: 'Wizard 4',
							page: '/wizard/wizard-4'
						},
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
