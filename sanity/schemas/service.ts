import { defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import { Scan, Camera, Compass, Box, FileText, Briefcase } from 'lucide-react'

export default defineType({
    name: 'service',
    title: 'Servicio',
    type: 'document',
    orderings: [orderRankOrdering],
    icon: Briefcase as any,
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text'
        }),
        defineField({
            name: 'icon',
            title: 'Icono',
            type: 'string',
            options: {
                list: [
                    { title: 'Scan (LiDAR/3D)', value: 'Scan' },
                    { title: 'Camera (Photo)', value: 'Camera' },
                    { title: 'Compass (Topo)', value: 'Compass' },
                    { title: 'Box (BIM)', value: 'Box' },
                    { title: 'FileText (Consulting)', value: 'FileText' },
                ]
            }
        }),
        defineField({
            name: 'features',
            title: 'Lista de Características',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'imagePosition',
            title: 'Posición de la Imagen',
            description: 'Ajusta qué parte de la imagen se debe priorizar (utiliza CSS object-position).',
            type: 'string',
            options: {
                list: [
                    { title: 'Centrado (Default)', value: 'object-center' },
                    { title: 'Arriba', value: 'object-top' },
                    { title: 'Abajo', value: 'object-bottom' },
                    { title: 'Izquierda', value: 'object-left' },
                    { title: 'Derecha', value: 'object-right' },
                ]
            },
            initialValue: 'object-center'
        }),
        defineField({
            name: 'imageFit',
            title: 'Ajuste de Imagen',
            description: 'Controla cómo se escala la imagen dentro de su contenedor (CSS object-fit).',
            type: 'string',
            options: {
                list: [
                    { title: 'Cubrir (Cover) - Recorta si es necesario', value: 'object-cover' },
                    { title: 'Contener (Contain) - Muestra toda la imagen', value: 'object-contain' },
                ]
            },
            initialValue: 'object-cover'
        }),
        defineField({
            name: 'conclusion',
            title: 'Conclusión / Beneficio',
            type: 'string'
        }),
        orderRankField({ type: 'service' })
    ],
    preview: {
        select: {
            title: 'title',
            iconName: 'icon',
            media: 'image'
        },
        prepare({ title, iconName, media }) {
            const icons: Record<string, any> = {
                Scan,
                Camera,
                Compass,
                Box,
                FileText
            }

            return {
                title,
                media: media || icons[iconName as string] || Briefcase
            }
        }
    }
})
