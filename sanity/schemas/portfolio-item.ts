
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'portfolioItem',
    title: 'Portfolio Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',

            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3
        }),
        defineField({
            name: 'image',
            title: 'Project Image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Descripción de la Imagen (Texto Alternativo)',
                    type: 'string'
                }),
                defineField({
                    name: 'className',
                    title: 'Alineación de la Imagen',
                    type: 'string',

                })
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'tech',
            title: 'Etiquetas',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number'
        })
    ]
})
