import * as React from 'react'
import { MultiEditPage } from '@contember/admin'
import { SeoFields } from '../components/Seo'

export default () => (
	<MultiEditPage
		entities="Seo[page.id != null]"
		pageName="seoPages"
		rendererProps={{ title: 'SEO pages', enableAddingNew: false, enableRemoving: false }}
	>
		<SeoFields advancedOptions hasRoleField referenceEntity="page" />
	</MultiEditPage>
)
