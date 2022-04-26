import * as React from 'react'
import { CreatePage } from '@contember/admin'
import { NavigationForm } from '../forms/navigationForms'

export default () => (
	<CreatePage
		entity="Menu"
		rendererProps={{ title: 'Add menu' }}
		redirectOnSuccess="navigationEdit(id: $entity.id)"
	>
		<NavigationForm />
	</CreatePage>
)
