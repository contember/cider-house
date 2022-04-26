import * as React from 'react'
import { EditPage } from '@contember/admin'
import { FormForm, FormSideForm } from '../forms/formForms'

export default () => (
	<EditPage
		entity="Form(id=$id)"
		rendererProps={{ title: 'Edit form' }}
	>
		<FormForm />
	</EditPage>
)
