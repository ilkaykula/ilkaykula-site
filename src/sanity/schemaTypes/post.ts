import {defineType, defineField} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Başlık', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: 'excerpt', title: 'Kısa Açıklama', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', title: 'Tarih', type: 'datetime' }),
    defineField({ name: 'coverImage', title: 'Kapak Görseli', type: 'image', options: {hotspot: true} }),
    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'array',
      of: [{type: 'block'}],
      validation: r => r.required(),
    }),
  ],
})
