
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'portfolioSection',
    title: 'Sección de Portafolio',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título de la Sección',
            type: 'string',
            initialValue: 'Proyectos que Digitalizan la Realidad'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo (Etiqueta)',
            type: 'string',
            initialValue: 'Portafolio'
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 3,
            initialValue: 'Cada proyecto es una oportunidad para demostrar nuestra precisión y compromiso con la excelencia técnica.'
        }),
    ]
})
