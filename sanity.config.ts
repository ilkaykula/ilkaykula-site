import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'İlkay Kula Studio',
  projectId: '299og3n5',
  dataset: 'production',
  apiVersion: '2024-01-01',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
