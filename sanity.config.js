import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '299og3n5',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  basePath: '/studio', // This is where studio will be accessible
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
