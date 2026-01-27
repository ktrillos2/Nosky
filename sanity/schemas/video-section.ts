import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'videoSection',
    title: 'Sección de Video',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            initialValue: 'Tecnología en Acción'
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            initialValue: 'Visualiza nuestros procesos y resultados'
        }),
        defineField({
            name: 'videoFile',
            title: 'Archivo de Video',
            type: 'file',
            options: {
                accept: 'video/*'
            }
        }),
        defineField({
            name: 'videoUrl',
            title: 'URL de Video (Opcional)',
            type: 'url',

        })
    ]
})
