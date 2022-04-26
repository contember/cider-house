import { SchemaDefinition as def } from '@contember/schema-definition'
import { File } from './File'
import { Form } from './Form'

export const FormInputType = def.createEnum(
	'shortAnswer', // question, file, textAnswer, required
	'paragraph', // question, file, textAnswer, required
	'multipeChoice', // question, file, options, required
	'checkBoxes', // question, file, options, required
	'dropDown', // question, file, options, required
	'fileUpload', // question, file, file, required
	'date', // question, file, date, required
	'dateTime', // question, file, dateTime, required
)

export class FormInput {
	order = def.intColumn().notNull()
	type = def.enumColumn(FormInputType).notNull()
	form = def.manyHasOne(Form, 'inputs').notNull().cascadeOnDelete()

	question = def.stringColumn()
	placeholder = def.stringColumn()
	options = def.oneHasMany(FormOption, 'formInput').orderBy('order')
	file = def.oneHasOne(File).setNullOnDelete()
	date = def.dateColumn()
	dateTime = def.dateTimeColumn()
	required = def.boolColumn().notNull().default(false)
}

export class FormOption {
	order = def.intColumn().notNull()
	value = def.stringColumn().notNull()
	formInput = def.manyHasOne(FormInput, 'options').notNull().cascadeOnDelete()
}
