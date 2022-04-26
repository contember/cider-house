import * as React from 'react'
import { Component, HasOne, ImageUploadField, TextField } from '@contember/admin'

type ImageFieldProps = {
	field: string
	label?: string
	description?: string
}

export const ImageField = Component<ImageFieldProps>(
	({ field, label, description }) => (
		<HasOne field={field}>
			<ImageUploadField
				label={label ?? 'Image'}
				urlField="url"
				widthField="width"
				heightField="height"
				description={description ?? ''}
			>
				<TextField field="alt" label="Alternative text" />
			</ImageUploadField>
		</HasOne>
	),
	'ImageField',
)
