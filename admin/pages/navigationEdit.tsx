import * as React from 'react'
import { EditPage } from '@contember/admin'
import { NavigationForm } from '../forms/navigationForms'

export default () => (
	<EditPage
		entity="Menu(id=$id)"
		rendererProps={{ title: 'Edit menu' }}
	>
		<NavigationForm />
	</EditPage>
)
