import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeText',
  title: 'Locale Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
    defineField({
      name: 'id',
      title: 'Indonesian',
      type: 'text',
    }),
  ],
})
