import * as React from 'react'
import { Field, LinkButton, TableCell, TablePage } from '@contember/admin'

export default () => (
	<TablePage
		entities="Menu"
		rendererProps={{
			title: 'Menus',
			actions: <LinkButton to="navigationCreate">Add menu</LinkButton>,
		}}
	>
		<TableCell><Field field="position" /></TableCell>
		<TableCell justification="justifyEnd">
			<LinkButton to="navigationEdit(id: $entity.id)">Edit menu</LinkButton>
		</TableCell>
	</TablePage>
)
