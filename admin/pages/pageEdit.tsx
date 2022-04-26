import * as React from 'react'
import { EditPage } from '@contember/admin'
import { PageForm, PageSideForm } from '../forms/pageForms'
import { clearSlugWhenPageHasRole } from "../utils/clearSlugWhenPageHasRole"

export default () => (
	<EditPage
		entity="Page(id=$id)"
		rendererProps={{ title: 'Edit page' }}
		onBeforePersist={(entityAccessor) => clearSlugWhenPageHasRole(entityAccessor)}
	>
		<PageForm />
	</EditPage>
)
