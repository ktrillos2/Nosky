
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'technologySection',
    title: 'Sección de Tecnología',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título de la Sección',
            type: 'string',
            initialValue: 'Equipamiento de Última Generación' // simplified for initial value, but rich text in frontend handles the split color
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo (Etiqueta)',
            type: 'string',
            initialValue: 'Tecnología'
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 3,
            initialValue: 'Invertimos constantemente en la mejor tecnología disponible para garantizar resultados de máxima precisión y calidad.'
        }),
    ]
})
