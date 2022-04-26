import * as React from 'react'
import { Component, DateTimeField, LinkButton, Section, SlugField, TextField } from '@contember/admin'
import { FormInputs } from '../components/FormInputs'
import { PreviewLink } from '../components/PreviewLink'
import { ContentField } from '../components/ContentField'

export const FormSideForm = Component(
	() => (
		<>
			<PreviewLink slugField="slug" prefix="/form/" />
			<DateTimeField field="publishAt" label="Publish date" defaultValue={new Date().toISOString()} />
			<LinkButton to="responseList(id: $entity.id)">See responses</LinkButton>
		</>
	),
	'FormSideForm',
)

export const FormForm = Component(
	() => (
		<>
			<Section heading="Your form">
				<FormInputs />
			</Section>
			<Section heading="Header and settings">
				<TextField field="title" label="Title" />
				<ContentField />
				<SlugField
					field="slug"
					label="Url"
					derivedFrom="title"
					unpersistedHardPrefix={(environment) => `${environment.getValue('WEB_URL')}/form/`}
				/>
			</Section>
		</>
	),
	'FormForm',
)
