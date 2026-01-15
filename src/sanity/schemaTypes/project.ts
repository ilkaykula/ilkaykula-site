import {defineType, defineField} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: r => r.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Kısa Açıklama',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'projectUrl',
      title: 'Proje Linki',
      type: 'url',
    }),

    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Küçük sayı üstte',
    }),
  ],
})
