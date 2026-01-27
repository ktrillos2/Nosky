import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'globalSettings',
    title: 'Configuración Global',
    type: 'document',
    fields: [
        defineField({
            name: 'companyName',
            title: 'Nombre de la Empresa',
            type: 'string',
            initialValue: 'NOSKY',
        }),
        defineField({
            name: 'seoTitle',
            title: 'Título para Google (SEO)',
            type: 'string',

        }),
        defineField({
            name: 'seoDescription',
            title: 'Descripción para Google (SEO)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'logo',
            title: 'Logo Principal',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'logoDark',
            title: 'Logo Secundario',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'menuItems',
            title: 'Menú de Navegación Principal',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Etiqueta' },
                        { name: 'link', type: 'string', title: 'Enlace' },
                    ]
                }
            ]
        }),
        defineField({
            name: 'email',
            title: 'Email de Contacto',
            type: 'string',
        }),
        defineField({
            name: 'phone',
            title: 'Teléfono de Contacto 1',
            type: 'string',
        }),
        defineField({
            name: 'phone2',
            title: 'Teléfono de Contacto 2',
            type: 'string',
        }),
        defineField({
            name: 'whatsapp',
            title: 'Número de WhatsApp',
            type: 'string',

        }),
        defineField({
            name: 'address',
            title: 'Dirección Física',
            type: 'text',
        }),
        defineField({
            name: 'googleMapsUrl',
            title: 'Link de Google Maps',
            type: 'url',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Redes Sociales',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Plataforma' },
                        { name: 'url', type: 'url', title: 'URL del Perfil' },
                    ]
                }
            ]
        }),
        defineField({
            name: 'footerText',
            title: 'Texto del Footer',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'footerCopyright',
            title: 'Copyright del Footer',
            type: 'string',

        }),
    ],
})
