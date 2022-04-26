import * as React from 'react'
import { CreatePage } from '@contember/admin'
import { PageForm, PageSideForm } from '../forms/pageForms'
import { clearSlugWhenPageHasRole } from "../utils/clearSlugWhenPageHasRole"

export default () => (
	<CreatePage
		entity="Page"
		rendererProps={{ title: 'New page' }}
		redirectOnSuccess="pageEdit(id: $entity.id)"
		onBeforePersist={(entityAccessor) => clearSlugWhenPageHasRole(entityAccessor)}
	>
		<PageForm />
	</CreatePage>
)
