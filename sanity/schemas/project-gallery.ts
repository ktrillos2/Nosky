import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'projectGallery',
    title: 'Galería de Proyectos',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Principal',
            type: 'string',
            initialValue: 'Galería de Proyectos'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'string',
            initialValue: 'Nuestra experiencia en campo capturada en imágenes.'
        }),
    ]
})
