import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'hero',
    title: 'Sección Hero',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Principal',
            type: 'string',
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'text',
        }),
        defineField({
            name: 'carouselImages',
            title: 'Imágenes del Carrusel',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'alt',
                            title: 'Descripción de la Imagen',
                            type: 'string',
                        }),
                        defineField({
                            name: 'position',
                            title: 'Position',
                            type: 'string',
                        }),
                        defineField({
                            name: 'fit',
                            title: 'Fit',
                            type: 'string',
                        }),
                        defineField({
                            name: 'overlayColor',
                            title: 'Overlay Color',
                            type: 'string',
                        }),



                    ]
                }
            ]
        })
    ]
})
