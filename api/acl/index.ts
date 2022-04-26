import { PermissionsBuilder } from '@contember/schema-definition'
import { Acl, Model } from '@contember/schema'
import { allField, readOnly, someFields } from './helpers'

const aclFactory = (model: Model.Schema): Acl.Schema => ({
	roles: {
		admin: {
			variables: {},
			stages: '*',
			entities: PermissionsBuilder.create(model).allowAll().allowCustomPrimary().permissions,
			s3: {
				'**': {
					upload: true,
					read: true,
				},
			},
		},
		public: {
			variables: {},
			stages: '*',
			s3: {
				'**': {
					upload: false,
					read: true,
				},
			},
			entities: {
				Button: {
					predicates: {},
					operations: readOnly(model, 'Button', true),
				},
				Content: {
					predicates: {},
					operations: readOnly(model, 'Content', true),
				},
				ContentPart: {
					predicates: {},
					operations: readOnly(model, 'ContentPart', true),
				},
				ContentReference: {
					predicates: {},
					operations: readOnly(model, 'ContentReference', true),
				},
				Image: {
					predicates: {},
					operations: readOnly(model, 'Image', true),
				},
				Link: {
					predicates: {},
					operations: readOnly(model, 'Link', true),
				},
				Menu: {
					predicates: {},
					operations: readOnly(model, 'Menu', true),
				},
				MenuItem: {
					predicates: {},
					operations: readOnly(model, 'MenuItem', true),
				},
				Page: {
					predicates: {},
					operations: readOnly(model, 'Page', true),
				},
				Seo: {
					predicates: {},
					operations: readOnly(model, 'Seo', true),
				},
				Setting: {
					predicates: {},
					operations: readOnly(model, 'Setting', true),
				}
			},
		},
		user: {
			variables: {
				identityId: {
					type: Acl.VariableType.predefined,
					value: 'identityID',
				}
			},
			inherits: ['public'],
			stages: '*',
			s3: {
				'**': {
					upload: false,
					read: true,
				},
			},
			entities: {}
		},
		b2b: {
			variables: {
				identityId: {
					type: Acl.VariableType.predefined,
					value: 'identityID',
				}
			},
			inherits: ['public'],
			stages: '*',
			s3: {
				'**': {
					upload: false,
					read: true,
				},
			},
			entities: {
				User: {
					predicates: {
						isMe: { identityId: 'identityId' },
					},
					operations: {
						read: { ...allField(model, 'User', 'isMe'), id: true },
						update: someFields('isMe', ['firstName', 'lastName', 'slots'])
					},
				},
				Slot: {
					predicates: {
						self: { user: { identityId: 'identityId' } },
						selfOrNull: { or: [{ user: { identityId: 'identityId' } }, { user: { id: { isNull: true } } }] },
					},
					operations: {
						create: allField(model, 'Slot', 'self'),
						read: allField(model, 'Slot', true),
						update: allField(model, 'Slot', 'selfOrNull'),
					},
				}
			}
		}
	},
})

export default aclFactory
