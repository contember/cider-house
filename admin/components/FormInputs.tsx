import * as React from 'react'
import { Block, BlockRepeater, CheckboxField, Component, Repeater, TextField } from '@contember/admin'

export const FormInputs = Component(
	() => (
		<BlockRepeater
			field="inputs"
			label={undefined}
			discriminationField="type"
			sortableBy="order"
			addButtonText="Add form input"
		>
			<Block discriminateBy="shortAnswer" label="Short answer">
				<TextField field="question" label="Question" />
				<TextField field="placeholder" label="Placeholder" />
				<CheckboxField field="required" label="Required" defaultValue={false} />
			</Block>

			<Block discriminateBy="paragraph" label="Paragraph">
				<TextField field="question" label="Question" />
				<TextField field="placeholder" label="Placeholder" />
				<CheckboxField field="required" label="Required" defaultValue={false} />
			</Block>

			<Block discriminateBy="multipeChoice" label="Multipe choice">
				<TextField field="question" label="Question" />
				<Repeater field="options" label="Options" sortableBy="order" >
					<TextField field="value" label="Answer" />
				</Repeater>
				<CheckboxField field="required" label="Required" defaultValue={false} />
			</Block>

			<Block discriminateBy="checkBoxes" label="Check Boxes">
				<TextField field="question" label="Question" />
				<Repeater field="options" label="Options" sortableBy="order">
					<TextField field="value" label="Answer" />
				</Repeater>
				<CheckboxField field="required" label="Required" defaultValue={false} />
			</Block>

			<Block discriminateBy="dropDown" label="Drop down">
				<TextField field="question" label="Question" />
				<Repeater field="options" label="Options" sortableBy="order">
					<TextField field="value" label="Answer" />
				</Repeater>
				<CheckboxField field="required" label="Required" defaultValue={false} />
			</Block>

			<Block discriminateBy="fileUpload" label="File upload">
				<TextField field="question" label="Question" />
				<CheckboxField field="required" label="Required" defaultValue={false} />
			</Block>

			<Block discriminateBy="date" label="Date">
				<TextField field="question" label="Question" />
				<CheckboxField field="required" label="Required" defaultValue={false} />
			</Block>

			<Block discriminateBy="dateTime" label="Date and time">
				<TextField field="question" label="Question" />
				<CheckboxField field="required" label="Required" defaultValue={false} />
			</Block>
		</BlockRepeater>
	),
	'ContentBlocks',
)
