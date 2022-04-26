import { SchemaDefinition as def } from '@contember/schema-definition'
import { Content } from './Content'
import { Image } from './Image'
import { Link } from './Link'
import { Seo } from './Seo'

export const PageTypeEnum = def.createEnum('homePage', 'blogPage', 'error404Page')

export class Page {
	publishAt = def.dateTimeColumn().default('now')
	slug = def.stringColumn().unique()
	role = def.enumColumn(PageTypeEnum).unique().nullable()
	linkedFrom = def.oneHasMany(Link, 'page')
	title = def.stringColumn()
	description = def.stringColumn()
	image = def.manyHasOne(Image)
	content = def.oneHasOne(Content).removeOrphan().setNullOnDelete()
	seo = def.oneHasOne(Seo, 'page').notNull().removeOrphan()
}
