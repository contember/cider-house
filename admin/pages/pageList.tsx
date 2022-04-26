import * as React from 'react'
import { DataGridPage, EnumCell, GenericCell, Link, LinkButton, TextCell } from '@contember/admin'
import { UrlCell } from '../components/UrlCell'

export default () => (
	<DataGridPage
		entities="Page"
		itemsPerPage={50}
		rendererProps={{ title: 'Pages', actions: <LinkButton to="pageCreate">New page</LinkButton> }}
	>
		<TextCell
			field="seo.title"
			header="Title"
			format={(scalar) => <Link to="pageEdit(id: $entity.id)">{scalar}</Link>}
		/>
		<EnumCell
			field="role"
			header="Role"
			options={{
				homePage: 'Home page',
				error404Page: 'Error 404',
				blogPage: 'Blog page',
			}}
		/>
		<UrlCell field="slug" header="Url" />
		<GenericCell canBeHidden={false} shrunk>
			<LinkButton to="pageEdit(id: $entity.id)">Edit</LinkButton>
		</GenericCell>
	</DataGridPage>
)
