import {defineType, defineField} from 'sanity'

export const workItem = defineType({
  name: 'workItem',
  title: 'Work Items',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Şirket', type: 'string', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Pozisyon', type: 'string', validation: r => r.required() }),

    defineField({ name: 'start', title: 'Başlangıç', type: 'string', validation: r => r.required() }),
    defineField({ name: 'end', title: 'Bitiş', type: 'string', validation: r => r.required() }),

    defineField({ name: 'link', title: 'Link (opsiyonel)', type: 'url' }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Küçük sayı üstte',
    }),
  ],
})
