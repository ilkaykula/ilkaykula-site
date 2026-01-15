import {defineType, defineField} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3 }),

    defineField({
      name: 'title',
      title: 'Sayfa Başlığı',
      type: 'string',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'array',
      of: [{type: 'block'}],
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'profileImage',
      title: 'Profil Fotoğrafı',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'socialLinks',
      title: 'Sosyal Linkler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
  ],
})
