import * as React from 'react'
import { Component, DateTimeField, TextAreaField, TextField } from '@contember/admin'
import { PreviewLink } from '../components/PreviewLink'
import { ImageField } from '../components/ImageField'
import { Seo } from '../components/Seo'
import { ContentField } from '../components/ContentField'

export const ArticleSideForm = Component(
	() => (
		<>
			<PreviewLink slugField="slug" prefix="/blog/" />
			<DateTimeField
				field="publishAt"
				label="Publish date"
				defaultValue={new Date().toISOString()}
			/>
		</>
	),
	'ArticleSideForm',
)

export const ArticleForm = Component(
	() => (
		<>
			<TextField field="headline" label="Headline" />
			<ImageField field="coverPhoto" label="Cover photo" />
			<TextAreaField field="lead" label="Lead" />
			<ContentField label="Text" size="large" />
			<Seo
				titleDerivedFrom="headline"
				descriptionDerivedFrom="lead"
				imageUrlDerivedFrom="coverPhoto.url"
				seoPage="seoArticles"
				seoFieldsProps={{
					unpersistedHardPrefix: '/blog/',
				}}
			/>
		</>
	),
	'ArticleForm',
)
