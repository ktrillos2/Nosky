
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'contactSection',
    title: 'Sección de Contacto',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título de la Sección',
            type: 'string',
            initialValue: '¡Hagamos Equipo!'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo (Etiqueta)',
            type: 'string',
            initialValue: 'Contacto'
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 3,
            initialValue: 'Cuéntanos sobre tu proyecto y te proporcionaremos una cotización personalizada.'
        }),
    ]
})
