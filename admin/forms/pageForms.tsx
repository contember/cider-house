import * as React from 'react'
import { Component, DateTimeField, RichTextField, Section, SelectField, Stack, TextField } from '@contember/admin'
import { Conditional } from '../components/Conditional'
import { ContentField } from '../components/ContentField'
import { ImageField } from '../components/ImageField'
import { PreviewLink } from '../components/PreviewLink'
import { Seo } from '../components/Seo'

export const PageSideForm = Component(
	() => (
		<>
			<Conditional showIf={(accessor) => accessor.getField('role').value === null}>
				<PreviewLink slugField="slug" />
			</Conditional>
			<Conditional showIf={(accessor) => accessor.getField('role').value === 'homePage'}>
				<PreviewLink slugField="slug" path={'/'} />
			</Conditional>
			<Conditional showIf={(accessor) => accessor.getField('role').value === 'blogPage'}>
				<PreviewLink slugField="slug" path={'/blog'} />
			</Conditional>
			<Conditional showIf={(accessor) => accessor.getField('role').value === 'error404Page'}>
				<PreviewLink slugField="slug" path={'/404'} />
			</Conditional>

			<DateTimeField
				field="publishAt"
				label="Publish date"
				defaultValue={new Date().toISOString()}
			/>
			<SelectField
				field="role"
				label="Page role"
				defaultValue={null}
				allowNull
				options={[
					{ value: null, label: 'Default' },
					{ value: 'homePage', label: 'Home page' },
					{ value: 'blogPage', label: 'Blog' },
					{ value: 'error404Page', label: 'Error 404' }
				]}
			/>
		</>
	),
	'PageSideForm',
)

export const PageForm = Component(
	() => (
		<>
			<Section>
				<Stack gap="large" direction="horizontal">
					<div>
						<TextField size='large' field="title" label="Headline" />
						<div style={{ marginTop: '10px' }}>
							<RichTextField field="description" label="Description" />
						</div>
					</div>
					<div style={{ marginTop: '2.4em' }}>
						<ImageField field="image" label="" />
					</div>
				</Stack>
				<ContentField size="large" label='' />
			</Section>
			<Section>
				<SelectField
					field="role"
					label="Page role"
					defaultValue={null}
					allowNull
					options={[
						{ value: null, label: 'Default' },
						{ value: 'homePage', label: 'Home page' },
						{ value: 'blogPage', label: 'Blog' },
						{ value: 'error404Page', label: 'Error 404' }
					]}
				/>
			</Section>
			<Seo
				seoPage="seoPages"
				seoFieldsProps={{
					unpersistedHardPrefix: '/',
					hasRoleField: true,
				}}
			/>
		</>
	),
	'PageForm',
)
