import * as React from 'react'
import { Component, DerivedFieldLink, DerivedFieldLinkProps, Field, ImageUploadField, LinkButton, Section, SlugField, TextareaField, TextField } from '@contember/admin'
import { Conditional } from './Conditional'
import { getSlugPrefix } from '../utils/getSlugPrefix'

export type SeoSlugFieldProps = {
	unpersistedHardPrefix?: string
	webUrl?: string
	referenceEntity?: string
	hasRoleField?: boolean
}

export type SeoFieldsProps = SeoSlugFieldProps & {
	field?: string
	advancedOptions?: boolean
}

export type SeoFormProps = {
	titleDerivedFrom?: DerivedFieldLinkProps['sourceField'],
	descriptionDerivedFrom?: DerivedFieldLinkProps['sourceField'],
	imageUrlDerivedFrom?: DerivedFieldLinkProps['sourceField']
	titleTransform?: DerivedFieldLinkProps['transform'],
	seoFieldsProps?: SeoFieldsProps
	seoPage: string
}

const SeoSlugField = Component<SeoFieldsProps>(
	({ hasRoleField, referenceEntity, unpersistedHardPrefix }) => {
		const fieldRole = referenceEntity ? referenceEntity + '.role' : 'role'
		const fieldSlug = referenceEntity ? referenceEntity + '.slug' : 'slug'
		const fieldTitle = referenceEntity ? (!hasRoleField ? referenceEntity + '.headline' : referenceEntity + '.seo.title') : 'seo.title'

		if (hasRoleField) {
			return (
				<Conditional
					showIf={(accessor) => accessor.getField(fieldRole).value === null}
					additionalStaticChildren={<Field field={fieldRole} />}
				>
					<SlugField
						field={fieldSlug}
						derivedFrom={fieldTitle}
						label="Url"
						unpersistedHardPrefix={(environment) => {
							return getSlugPrefix(environment, unpersistedHardPrefix)
						}}
					/>
				</Conditional>
			)
		} else {
			return (
				<SlugField
					field={fieldSlug}
					derivedFrom={fieldTitle}
					label="Url"
					unpersistedHardPrefix={(environment) => {
						return getSlugPrefix(environment, unpersistedHardPrefix)
					}}
				/>
			)
		}

	},
	'SeoSlugField'
)

export const SeoFields = Component<SeoFieldsProps>(
	(props) => {
		const { field, advancedOptions } = props
		const fieldTitle = field ? field + '.title' : 'title'
		const fieldDescription = field ? field + '.description' : 'description'
		const fieldOgTitle = field ? field + '.ogTitle' : 'ogTitle'
		const fieldOgDescription = field ? field + '.ogDescription' : 'ogDescription'
		const fieldOgImageUrl = field ? field + '.ogImage.url' : 'ogImage.url'

		return (
			<>
				<TextField field={fieldTitle} label="Title" required />
				<SeoSlugField {...props} />
				<TextareaField
					field={fieldDescription}
					label="Description"
					description="Short summary of the page. Keep it between 120 and 158 characters."
				/>
				{advancedOptions &&
					<>
						<TextField field={fieldOgTitle} label="OG title" />
						<TextareaField field={fieldOgDescription} label="OG description" />
						<ImageUploadField
							urlField={fieldOgImageUrl}
							label="OG image"
							description="Recommended aspect ratio 19:10 (e.g.: 2400×1260 px)."
						/>
					</>
				}
			</>
		)

	},
	'SeoFields',
)


export const Seo = Component<SeoFormProps>(
	({ titleDerivedFrom, descriptionDerivedFrom, imageUrlDerivedFrom, titleTransform, seoPage, seoFieldsProps }) => (
		<Section heading="SEO">
			{titleDerivedFrom &&
				<>
					<DerivedFieldLink sourceField={titleDerivedFrom} derivedField="seo.title" transform={titleTransform} />
					<DerivedFieldLink sourceField={titleDerivedFrom} derivedField="seo.ogTitle" transform={titleTransform} />
				</>
			}
			{descriptionDerivedFrom &&
				<>
					<DerivedFieldLink sourceField={descriptionDerivedFrom} derivedField="seo.description" />
					<DerivedFieldLink sourceField={descriptionDerivedFrom} derivedField="seo.ogDescription" />
				</>
			}
			{imageUrlDerivedFrom &&
				<>
					<DerivedFieldLink sourceField={imageUrlDerivedFrom} derivedField="seo.ogImage.url" />
				</>
			}
			<SeoFields field="seo" {...seoFieldsProps} />
			<LinkButton to={seoPage}>Advanced SEO settings</LinkButton>
		</Section>
	),
	'Seo',
)
