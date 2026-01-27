import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Servicio',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule) => Rule.required()
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
            name: 'conclusion',
            title: 'Conclusión / Beneficio',
            type: 'string'
        }),
        defineField({
            name: 'imagePosition',
            title: 'Alineación de la Imagen',
            type: 'string',

            initialValue: 'object-center'
        }),
        defineField({
            name: 'imageFit',
            title: 'Estilo de Ajuste',
            type: 'string',
            initialValue: 'object-cover',
            options: {
                list: ['object-cover', 'object-contain']
            }
        })
    ]
})
