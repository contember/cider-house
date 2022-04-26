import * as React from 'react'
import { Menu } from '@contember/admin'

export const Navigation = () => (
	<Menu>
		<Menu.Item>
			<Menu.Item title="Pages" to="pageList" />
			<Menu.Item title="New page" to="pageCreate" />
			<Menu.Item title="Forms" to="formList" />
			<Menu.Item title="Reservation planner" to="reservationPlanner" />
		</Menu.Item>
		<Menu.Item title="Settings">
			<Menu.Item title="Users" to="users" />
			<Menu.Item title="General" to="settings" />
			<Menu.Item title="Navigation" to="navigationList" />
			<Menu.Item title="SEO" to="seoPages" />
		</Menu.Item>
	</Menu>
)
