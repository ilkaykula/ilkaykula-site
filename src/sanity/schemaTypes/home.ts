import {defineType, defineField} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'heroTitle',
      title: 'Ana Başlık',
      type: 'string',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'bio',
      title: 'Hakkımda Yazısı',
      type: 'text',
      rows: 10,
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'socialLinks',
      title: 'Sosyal Linkler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Etiket',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
        },
      ],
    }),
  ],
})
