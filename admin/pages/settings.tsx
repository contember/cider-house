import * as React from 'react'
import { EditPage, Section } from '@contember/admin'
import { ContentField } from '../components/ContentField'
import { ImageField } from '../components/ImageField'

export default () => (
	<EditPage
		entity="Setting(unique = One)"
		setOnCreate="(unique = One)"
		rendererProps={{ title: 'Settings' }}
	>
		<Section heading="Logo">
			<ImageField label="Logo" field="logo" />
		</Section>
		<Section heading="Footer">
			<ContentField field="footerCopyright.parts" label="Footer copyright" size="default" />
		</Section>
	</EditPage>
)
