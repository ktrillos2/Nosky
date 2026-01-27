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
                            title: 'Alineación de la Imagen',
                            type: 'string',

                            initialValue: 'object-center'
                        }),
                        defineField({
                            name: 'fit',
                            title: 'Estilo de Ajuste',
                            type: 'string',

                            initialValue: 'object-cover'
                        }),
                        defineField({
                            name: 'overlayColor',
                            title: 'Nivel de Oscuridad (Fondo)',
                            type: 'string',

                        }),
                    ]
                }
            ]
        })
    ]
})
