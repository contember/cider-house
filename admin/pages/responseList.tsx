import * as React from 'react'
import { DataBindingProvider, DataGrid, DateCell, EntitySubTree, FeedbackRenderer, Field, GenericCell, LayoutPage, LinkButton, NavigateBackButton, StaticRender, TextCell, useAuthedContentQuery, useCurrentRequest } from '@contember/admin'

export type QuestionQueryResult = {
	listFormInput: {
		id: string
		type: string
		question: string
		inputs: {
			id: string
			question: string
		}[]
	}[]
}

const LIST_RESPONSE_QUERY = `
	query ($id: UUID!) {
		listFormInput(filter: { form: { id: { eq: $id } } }) {
			id
			type
			question
		}
	}
`

export default () => {
	const id = useCurrentRequest()!.parameters.id as string
	const { state: query } = useAuthedContentQuery<QuestionQueryResult, { id: string }>(LIST_RESPONSE_QUERY, { id })

	if (query.state !== 'success') return <></>

	return (
		<DataBindingProvider stateComponent={FeedbackRenderer}>
			<EntitySubTree entity="Form(id = $id)">
				<LayoutPage
					title={<>Responses from <Field field="title" /></>}
					navigation={<NavigateBackButton to="formList">Forms</NavigateBackButton>}
				>
					<DataGrid entities="Response[form.id = $id]" itemsPerPage={50}>
						{query.data.listFormInput.map(formInput => {
							if (['date', 'dateTime'].includes(formInput.type)) {
								return <DateCell key={formInput.id} field={`answers(input.id = '${formInput.id}').value`} header={formInput.question} />
							} else if (['shortAnswer', 'paragraph'].includes(formInput.type)) {
								return <TextCell key={formInput.id} field={`answers(input.id = '${formInput.id}').value`} header={formInput.question} />
							}
						})}
						<DateCell field="createdAt" header="Created at" initialOrder="desc" />
						<GenericCell shrunk canBeHidden={false}>
							<LinkButton to="responseView(id: $entity.id)">View</LinkButton>
						</GenericCell>
					</DataGrid>
				</LayoutPage>
				<StaticRender>
					<Field field="title" />
				</StaticRender>
			</EntitySubTree>
		</DataBindingProvider>
	)
}
