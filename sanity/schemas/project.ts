import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export default defineType({
    name: 'project',
    title: 'Proyecto',
    type: 'document',
    orderings: [orderRankOrdering],
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

        orderRankField({ type: 'project' })
    ]
})
