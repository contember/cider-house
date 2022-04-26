import * as React from 'react'
import { Component, HasOne, RadioField, TextField } from '@contember/admin'
import { LinkField } from './LinkField'

type ButtonProps = {
	field: string
}

export const Button = Component<ButtonProps>(
	({ field }) => (
		<HasOne field={field}>
			<LinkField field="target" label="Link" />
			<TextField field="label" label="Label" />
			<RadioField
				field="type"
				label="Type"
				defaultValue="primary"
				options={[
					{ value: 'primary', label: 'Primary' },
					{ value: 'secondary', label: 'Secondary' },
				]}
			/>
		</HasOne>
	),
	'Button',
)
