
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'technologyCategory',
    title: 'Categoría de Tecnología',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título de la Categoría',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'icon',
            title: 'Icono',
            type: 'string',
            options: {
                list: [
                    { title: 'Avión (Drones)', value: 'Plane' },
                    { title: 'Línea de Escaneo (Sensores)', value: 'ScanLine' },
                    { title: 'Caja (Escáneres)', value: 'Box' },
                    { title: 'Configuración (Herramientas)', value: 'Settings' },
                    { title: 'CPU (Software)', value: 'Cpu' },
                    { title: 'Nube', value: 'Cloud' },
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'order',
            title: 'Orden de Visualización',
            type: 'number',

        })
    ]
})
