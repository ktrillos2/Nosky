import { type StructureResolver } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
    S.list()
        .title('Content')
        .items([
            // Singleton Items
            S.listItem()
                .title('Video de Tecnología')
                .id('videoSection')
                .child(
                    S.document()
                        .schemaType('videoSection')
                        .documentId('videoSection')
                ),

            // Services Group
            S.divider(),
            S.listItem()
                .title('Configuración de Servicios')
                .id('servicesSection')
                .child(
                    S.document()
                        .schemaType('servicesSection')
                        .documentId('servicesSection')
                ),
            orderableDocumentListDeskItem({
                type: 'service',
                title: 'Lista de Servicios (Ordenable)',
                S,
                context
            }),

            // Project Gallery Group
            S.divider(),
            S.listItem()
                .title('Configuración de Galería')
                .id('projectGallery')
                .child(
                    S.document()
                        .schemaType('projectGallery')
                        .documentId('projectGallery')
                ),
            orderableDocumentListDeskItem({
                type: 'project',
                title: 'Lista de Proyectos (Ordenable)',
                S,
                context
            }),

            S.divider(),
            S.listItem()
                .title('Configuración de Tecnología')
                .id('technologySection')
                .child(
                    S.document()
                        .schemaType('technologySection')
                        .documentId('technologySection')
                ),
            S.documentTypeListItem('technologyCategory')
                .title('Categorías de Tecnología')
                .schemaType('technologyCategory'),

            S.divider(),
            S.listItem()
                .title('Configuración de Portafolio')
                .id('portfolioSection')
                .child(
                    S.document()
                        .schemaType('portfolioSection')
                        .documentId('portfolioSection')
                ),
            orderableDocumentListDeskItem({
                type: 'portfolioItem',
                title: 'Items del Portafolio (Ordenable)',
                S,
                context
            }),

            S.divider(),
            S.listItem()
                .title('Configuración de Clientes')
                .id('clientsSection')
                .child(
                    S.document()
                        .schemaType('clientsSection')
                        .documentId('clientsSection')
                ),
            S.documentTypeListItem('clientItem')
                .title('Sectores / Clientes')
                .schemaType('clientItem'),

            S.divider(),
            S.listItem()
                .title('Configuración de Contacto')
                .id('contactSection')
                .child(
                    S.document()
                        .schemaType('contactSection')
                        .documentId('contactSection')
                ),

            // Divider
            S.divider(),

            // Regular Document Types
            // Filter out singletons so they don't appear in the list
            ...S.documentTypeListItems().filter(
                (listItem) => ![
                    'videoSection',
                    'servicesSection',
                    'projectGallery',
                    'service',
                    'project',
                    'technologySection',
                    'technologyCategory',
                    'portfolioSection',
                    'portfolioItem',
                    'clientsSection',
                    'clientItem',
                    'contactSection'
                ].includes(listItem.getId() || '')
            ),
        ])
