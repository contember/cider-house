import * as React from 'react'
import { Block, BlockEditor, BlockEditorProps, Box, Component, HasOne, Repeater, RichEditor, RichTextField, Stack, TextField } from '@contember/admin'
import { InsertLink, LinkElement } from './CustomLinks'
import { withAnchorsAsReference } from './AnchorInsertHandler'
import { ImageField } from './ImageField'
import { Button } from './Button'

type ContentFieldProps = {
	contentField?: string
	referencesField?: string
	field?: string
	label?: string
	size?: 'large' | 'default'
}

const RB = RichEditor.buttons
const inlineButtons: BlockEditorProps['inlineButtons'] = [
	[
		RB.bold,
		RB.italic,
		RB.underline,
		RB.strikeThrough
	],
	[
		RB.headingOne,
		RB.headingTwo,
		RB.headingThree,
		RB.headingFour,
	],
	[
		RB.unorderedList,
		RB.orderedList,
	],
	[
		RB.code,
		{
			discriminateBy: 'link',
			referenceContent: InsertLink,
			label: 'Insert link',
			title: 'Insert link',
			blueprintIcon: 'link',
		},
	]
]

export const ContentField = Component<ContentFieldProps>(
	({ contentField, referencesField, field, label, size }) => (
		<BlockEditor
			contentField={contentField ?? 'json'}
			referencesField={referencesField ?? 'references'}
			referenceDiscriminationField="type"
			field={field ?? 'content.parts'}
			label={label ?? 'Content'}
			size={size ?? 'default'}
			sortableBy="order"
			inlineButtons={inlineButtons}
			blockButtons={[
				{
					discriminateBy: 'image',
					blueprintIcon: 'media' as const,
					title: 'Image',
				},
				{
					discriminateBy: 'ctaSection',
					contemberIcon: 'megaphone' as const,
					title: 'CTA section',
				},
				{
					discriminateBy: 'testimonialSection',
					blueprintIcon: 'heart' as const,
					title: 'Testimonial section',
				},
				{
					discriminateBy: 'productSection',
					blueprintIcon: 'glass' as const,
					title: 'Product section',
				},
			]}
			augmentEditorBuiltins={editor => {
				withAnchorsAsReference(
					editor,
					{
						elementType: 'link',
						updateReference: (url, getAccessor) => {
							getAccessor().getField('target.type').updateValue('external')
							getAccessor().getField('target.url').updateValue(url)
						},
					},
				)
				editor.registerElement({
					type: 'link',
					isInline: true,
					render: LinkElement,
				})
			}}
		>
			<Block discriminateBy="ctaSection">
				<TextField field="primaryText" label="Headline" />
				<TextField field="secondaryText" label="Subtitle" />
				<Repeater
					field="buttons"
					label="Buttons"
					sortableBy="order"
					initialEntityCount={0}
					addButtonText="Add button"
				>
					<Button field="button" />
				</Repeater>
			</Block>

			<Block discriminateBy="testimonialSection">
				<TextField field="primaryText" label="Headline" />
				<Repeater
					field="testimonials"
					label="Testimonials"
					sortableBy="order"
					addButtonText="Add testimonial"
				>
					<Box heading="Author">
						<HasOne field="author">
							<Stack gap="large" direction="horizontal">
								<ImageField field="image" label="Image" />
								<Stack gap="large" direction="vertical">
									<TextField field="name" label="Name" />
									<RichTextField field="title" label="Title" />
								</Stack>
							</Stack>
						</HasOne>
					</Box>
				</Repeater>
			</Block>

			<Block discriminateBy="productSection">
				<TextField field="primaryText" label="Title" />
				<Repeater
					field="testimonials"
					label="Products"
					sortableBy="order"
					addButtonText="Add product"
				>
					<HasOne field="author">
						<Stack gap="large" direction="horizontal">
							<Stack gap="default" direction="vertical">
								<TextField field="name" label="Name" />
								<TextField field="title" label="Price" />
							</Stack>
							<ImageField field="image" label="Image" />
						</Stack>
					</HasOne>
				</Repeater>
			</Block>

			<Block discriminateBy="image">
				<ImageField field="image" label="Image" />
			</Block>

		</BlockEditor>
	),
	'ContentField',
)
