import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Proyecto',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título del Proyecto',
            type: 'string',

        }),
        defineField({
            name: 'image',
            title: 'Imagen de Galería',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: 'alt',
            title: 'Descripción de la Imagen',
            type: 'string'
        }),
        defineField({
            name: 'className',
            title: 'Alineación de la Imagen',
            type: 'string',

        })
    ]
})
