
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'clientItem',
    title: 'Item de Cliente/Industria',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre de Industria',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'icon',
            title: 'Icono',
            type: 'string',
            options: {
                list: [
                    { title: 'Building2 (Construcción)', value: 'Building2' },
                    { title: 'Factory (Industrial)', value: 'Factory' },
                    { title: 'Landmark (Patrimonio)', value: 'Landmark' },
                    { title: 'Home (Arquitectura)', value: 'Home' },
                    { title: 'Mountain (Minería)', value: 'Mountain' },
                    { title: 'Zap (Energía)', value: 'Zap' },
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'order',
            title: 'Orden',
            type: 'number'
        })
    ]
})
