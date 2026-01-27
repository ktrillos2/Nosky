import { defineField, defineType } from 'sanity'
import { Plane, ScanLine, Box, Settings, Cpu, Cloud, Tag } from 'lucide-react'

export default defineType({
    name: 'technologyCategory',
    title: 'Categoría de Tecnología',
    type: 'document',
    icon: Tag as any,
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
    ],
    preview: {
        select: {
            title: 'title',
            iconName: 'icon'
        },
        prepare({ title, iconName }) {
            const icons: Record<string, any> = {
                Plane,
                ScanLine,
                Box,
                Settings,
                Cpu,
                Cloud
            }

            return {
                title,
                media: icons[iconName as string] || Tag
            }
        }
    }
})
