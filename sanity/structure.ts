import { type StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
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
            S.documentTypeListItem('service')
                .title('Lista de Servicios'),

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
            S.documentTypeListItem('project')
                .title('Lista de Proyectos'),

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
            S.documentTypeListItem('portfolioItem')
                .title('Items del Portafolio')
                .schemaType('portfolioItem'),

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
