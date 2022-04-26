import * as React from 'react'
import { ApplicationEntrypoint, LoginEntrypoint, Pages, runReactApp } from '@contember/admin'
import { Layout } from './components/Layout'
import '@contember/admin/style.css'
import './style.css'

if (window.location.hash === '#login') {
	runReactApp(
		<LoginEntrypoint
			apiBaseUrl={import.meta.env.VITE_CONTEMBER_ADMIN_API_BASE_URL}
			loginToken={import.meta.env.VITE_CONTEMBER_ADMIN_LOGIN_TOKEN}
			projects={[import.meta.env.VITE_CONTEMBER_ADMIN_PROJECT_NAME]}
			formatProjectUrl={it => `/${it.slug}/`}
		/>,
	)
} else {
	runReactApp(
		<ApplicationEntrypoint
			basePath={import.meta.env.BASE_URL}
			apiBaseUrl={import.meta.env.VITE_CONTEMBER_ADMIN_API_BASE_URL}
			sessionToken={import.meta.env.VITE_CONTEMBER_ADMIN_SESSION_TOKEN}
			project={import.meta.env.VITE_CONTEMBER_ADMIN_PROJECT_NAME}
			stage="live"
			envVariables={{ WEB_URL: import.meta.env.VITE_CONTEMBER_ADMIN_WEB_URL }}
			children={<Pages layout={Layout} children={import.meta.glob('./pages/**/*.tsx')} />}
		/>,
	)
}
