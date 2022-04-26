import * as React from 'react'
import { DataGridPage, DateCell, GenericCell, LinkButton, TextCell } from '@contember/admin'
import { UrlCell } from '../components/UrlCell'

export default () => (
	<DataGridPage
		entities="Form"
		itemsPerPage={50}
		rendererProps={{ title: 'Forms', actions: <LinkButton to="formCreate">New form</LinkButton> }}
	>
		<TextCell field="title" header="Title" />
		<UrlCell field="slug" header="Url" prefix="form" />
		<TextCell field="details.responsesCount" header={'Number of responses'} />
		<GenericCell shrunk canBeHidden={false}>
			<LinkButton to="formEdit(id: $entity.id)">Edit</LinkButton>
		</GenericCell>
		<GenericCell shrunk canBeHidden={false}>
			<LinkButton to="responseList(id: $entity.id)">See responses</LinkButton>
		</GenericCell>
	</DataGridPage>
)
