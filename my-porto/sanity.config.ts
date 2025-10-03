import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {AutoRelatedProjects} from './documentActions/autoRelatedProjects'

export default defineConfig({
  name: 'default',
  title: 'my-porto',

  projectId: '889te60g',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, {schemaType}) => {
      if (schemaType === 'project') {
        return prev.map((originalAction) =>
          originalAction.action === 'publish' ? AutoRelatedProjects : originalAction
        )
      }
      return prev
    },
  },
})
