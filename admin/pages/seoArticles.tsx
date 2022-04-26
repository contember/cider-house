import * as React from 'react'
import { MultiEditPage } from '@contember/admin'
import { SeoFields } from '../components/Seo'

export default () => (
	<MultiEditPage
		entities="Seo[article.id != null]"
		pageName="seoArticles"
		rendererProps={{ title: 'SEO articles', enableAddingNew: false, enableRemoving: false }}
	>
		<SeoFields advancedOptions referenceEntity="article" />
	</MultiEditPage>
)
