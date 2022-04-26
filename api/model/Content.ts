import { SchemaDefinition as def } from '@contember/schema-definition'
import { Button } from './Button'
import { Image } from './Image'
import { Link } from './Link'

export class Content {
	parts = def.oneHasMany(ContentPart, 'content').orderBy('order')
}

export class ContentPart {
	order = def.intColumn().notNull()
	content = def.manyHasOne(Content, 'parts').notNull().cascadeOnDelete()
	json = def.stringColumn().notNull()
	references = def.oneHasMany(ContentReference, 'contentPart')
}

export const ContentReferenceType = def.createEnum(
	'link',
	'heroSection',
	'logosSection',
	'contentSection',
	'featureSection',
	'ctaSection',
	'testimonialSection',
	'contactSection',
	'productSection',
	'image',
)

export class ContentReference {
	contentPart = def.manyHasOne(ContentPart, 'references').notNull().cascadeOnDelete()
	type = def.enumColumn(ContentReferenceType).notNull()
	target = def.oneHasOne(Link).removeOrphan().setNullOnDelete()

	primaryText = def.stringColumn()
	secondaryText = def.stringColumn()
	image = def.manyHasOne(Image).setNullOnDelete()
	images = def.oneHasMany(ContentImage, 'contentReference').orderBy('order')
	buttons = def.oneHasMany(ContentButton, 'contentReference').orderBy('order')
	featureList = def.oneHasMany(ContentFeatureItem, 'contentReference').orderBy('order')
	testimonials = def.oneHasMany(ContentTestimonial, 'contentReference').orderBy('order')
	blogPosts = def.oneHasMany(ContentBlogPost, 'contentReference').orderBy('order')
}

export class ContentImage {
	order = def.intColumn().notNull()
	image = def.manyHasOne(Image).setNullOnDelete()
	contentReference = def.manyHasOne(ContentReference, 'images').notNull().cascadeOnDelete()
}

export class ContentButton {
	order = def.intColumn().notNull()
	button = def.oneHasOne(Button).notNull().removeOrphan()
	contentReference = def.manyHasOne(ContentReference, 'buttons').notNull().cascadeOnDelete()
}

export class ContentFeatureItem {
	order = def.intColumn().notNull()
	primaryText = def.stringColumn()
	icon = def.manyHasOne(Image).setNullOnDelete()
	contentReference = def.manyHasOne(ContentReference, 'featureList').notNull().cascadeOnDelete()
}

export class ContentTestimonial {
	order = def.intColumn().notNull()
	author = def.oneHasOne(TestimonialAuthor).removeOrphan().setNullOnDelete()
	contentReference = def.manyHasOne(ContentReference, 'testimonials').notNull().cascadeOnDelete()
}

export class TestimonialAuthor {
	name = def.stringColumn().notNull()
	title = def.stringColumn()
	image = def.manyHasOne(Image).setNullOnDelete()
}

export class ContentBlogPost {
	order = def.intColumn().notNull()
	contentReference = def.manyHasOne(ContentReference, 'blogPosts').notNull().cascadeOnDelete()
}
