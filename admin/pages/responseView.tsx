import * as React from 'react'
import { EditPage, Field, HasMany, NavigateBackButton, Stack, StaticRender } from '@contember/admin'
import './responseView.css'

export default () => (
	<EditPage
		entity="Response(id = $id)"
		rendererProps={{
			actions: <></>,
			navigation: <NavigateBackButton to="responseList(id: $entity.form.id)">Responses</NavigateBackButton>,
		}}
	>
		<Stack direction="vertical" gap="small">
			<HasMany field="answers">
				<h4 className="question"><Field field="input.question" /></h4>
				<h3 className="answer"><Field field="value" /></h3>
			</HasMany>
			<h4 className="question">Created at</h4>
			<h3 className="answer"><Field field="createdAt" format={(value) => <>{Intl.DateTimeFormat('en-GB').format(new Date(value!.toString()))}</>} /></h3>
		</Stack>

		<StaticRender>
			<Field field="form.id" />
		</StaticRender>
	</EditPage>
)
