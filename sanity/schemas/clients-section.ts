
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'clientsSection',
    title: 'Sección de Clientes',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título de la Sección',
            type: 'string',
            initialValue: 'Industrias que Confían en Nosotros'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo (Etiqueta)',
            type: 'string',
            initialValue: 'Sectores'
        }),
    ]
})
