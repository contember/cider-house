import * as React from 'react'
import { CreatePage } from '@contember/admin'
import { FormForm, FormSideForm } from '../../admin/forms/formForms'

export default () => (
	<CreatePage
		entity="Form"
		rendererProps={{ title: 'New form' }}
		redirectOnSuccess="formEdit(id: $entity.id)"
	>
		<FormForm />
	</CreatePage>
)
