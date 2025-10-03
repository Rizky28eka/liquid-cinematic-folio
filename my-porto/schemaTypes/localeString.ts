import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'localeString',
  title: 'Locale String',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
    }),
    defineField({
      name: 'id',
      title: 'Indonesian',
      type: 'string',
    }),
  ],
})
