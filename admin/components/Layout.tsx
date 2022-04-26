import * as React from 'react'
import { ReactNode } from 'react'
import { Layout as ContemberLayout } from '@contember/admin'
import { Navigation } from './Navigation'
import AppleLogo from '../static/apple.svg'

export const Layout = (props: { children?: ReactNode }) => (
	<ContemberLayout sidebarHeader={<><img src={AppleLogo} style={{height: '3em', margin: '0 auto', display: 'block'}} /></>} navigation={<Navigation />}>
		{props.children}
	</ContemberLayout>
)