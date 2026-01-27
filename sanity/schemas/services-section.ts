import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'servicesSection',
    title: 'Sección de Servicios',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Principal',
            type: 'string',
            initialValue: 'Nuestras Soluciones'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtítulo',
            type: 'string',
            initialValue: 'Tecnología de Vanguardia aplicada a la captura y procesamiento de datos geoespaciales'
        }),
    ]
})
