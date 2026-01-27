
import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error('❌ Missing required environment variables')
    process.exit(1)
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

const SERVICES_DATA = [
    {
        icon: "Scan",
        title: "LiDAR Aéreo",
        description: "El LiDAR aéreo es una tecnología de captura remota de alta precisión que utiliza pulsos láser emitidos desde drones. Permite obtener información detallada del relieve, incluso en zonas con vegetación densa, siendo una herramienta clave para topografía, ingeniería, agricultura y conservación del patrimonio histórico.",
        features: [
            "Generación de nubes de puntos 3D georreferenciadas",
            "Modelos Digitales del Terreno (MDT) y de Superficie (MDS)",
            "Curvas de nivel y análisis de pendientes",
            "Cálculo de volúmenes y superficies",
            "Cartografía de alta precisión",
            "Análisis del terreno bajo cobertura vegetal",
        ],
        imageFile: "Dronsote.jpg",
        conclusion: "El uso de LiDAR aéreo permite cubrir grandes extensiones en menor tiempo, con alta precisión y mínima intervención en campo.",
        imagePosition: "object-[center_77%] brightness-130",
    },
    {
        icon: "Scan",
        title: "Escaneo 3D",
        description: "Captura Digital precisa de entornos físicos para ingeniería y arquitectura y conservación histórica. Transformando espacios físicos en miles de puntos con coordenadas exactas y colores reales que recrean una edificación con precisión",
        features: ["Nubes de Puntos", "Modelos Digitales", "Precisión Milimétrica"],
        imageFile: "D-1.png",
        imageFit: "object-contain",
    },
    {
        icon: "Camera",
        title: "Fotogrametría",
        description: "Mediante Vehículos Aéreos No Tripulados (VANT) equipados con cámaras de alta resolución, realizamos la captura fotográfica necesaria para documentar, ilustrar e inspeccionar de forma precisa cualquier sitio o elemento de interés. Con esta tecnología obtenemos:",
        features: [
            "Ortomosaicos de alta precisión",
            "Modelos Digitales de Elevación (MDE)",
            "Curvas de nivel",
            "Mapas termográficos",
            "Modelos 3D y nubes de puntos",
            "Cálculo de volúmenes y superficies",
            "Inspección visual de áreas de difícil acceso",
        ],
        imageFile: "E-2.jpg",
        conclusion: "Todo esto permite cubrir grandes superficies en muy poco tiempo, con alta precisión y a un costo significativamente menor en comparación con métodos tradicionales.",
        imagePosition: "object-[center_95%] brightness-130",
    },
    {
        icon: "Compass",
        title: "Topografía de Precisión",
        description: "Realizamos la medición detallada de terrenos para el conocimiento exacto de dimensiones, superficies y desniveles, proporcionando una referencia confiable para proyectos de construcción, regularización y documentación legal. Entregamos datos topográficos precisos y verificables, fundamentales para la planificación, diseño y ejecución de obra, así como para su correcta descripción técnica en trámites y documentos oficiales.",
        features: [
            "Planimetría y altimetría",
            "Georreferenciación (UTM)",
            "Curvas de nivel",
            "Amojonamiento",
            "Levantamientos topográficos con estación total y GNSS",
            "Cálculo de áreas, perímetros y volúmenes",
            "Perfiles longitudinales y transversales del terreno",
        ],
        imageFile: "IMG_7066.JPG",
        conclusion: "Este enfoque garantiza precisión, claridad y respaldo técnico en cada proyecto.",
    },
    {
        icon: "Box",
        title: "Modelado BIM",
        description: "Desarrollamos modelos inteligentes BIM orientados a la gestión eficiente de edificaciones e infraestructuras, integrando información geométrica y técnica para todas las etapas del proyecto. Creamos modelos BIM desde LOD 100 hasta LOD 400, así como As-Built, garantizando coherencia entre el diseño, la construcción y la operación. Nuestros servicios incluyen:",
        features: [
            "LOD 100 – Modelado conceptual",
            "LOD 200 – Modelado esquemático",
            "LOD 300 – Modelado de diseño y coordinación",
            "LOD 400 – Modelado para construcción",
            "Documentación As-Built",
            "Extracción de planos y cuantificaciones",
            "Integración con levantamientos topográficos, Arquitectonicos y Estructurales, nubes de puntos y fotogrametría",
        ],
        imageFile: "mosaico-f.png",
        conclusion: "El modelado BIM permite mejor toma de decisiones, reducción de errores en obra y una administración integral del proyecto.",
        imageFit: "object-contain",
    },
    {
        icon: "FileText",
        title: "Consultoría técnica basada en datos",
        description: "Brindamos consultoría técnica especializada enfocada en la toma de decisiones basada en datos, integrando información obtenida mediante levantamientos topográficos, captura aérea, modelado 3D, fotogrametría y BIM. Nuestro enfoque permite analizar, interpretar y transformar los datos técnicos en soluciones claras y estratégicas para proyectos de topografía, arquitectura y conservación del patrimonio histórico, reduciendo riesgos y optimizando recursos. Nuestros servicios incluyen:",
        features: [
            "Análisis y validación de datos técnicos",
            "Interpretación de nubes de puntos, modelos 3D y ortomosaicos",
            "Asesoría para selección de metodologías y tecnologías de captura",
            "Informes técnicos para soporte de decisiones, proyectos y trámites",
            "Acompañamiento técnico durante la planeación y ejecución del proyecto",
        ],
        imageFile: "IMG-00045.jpeg",
        conclusion: "La consultoría técnica garantiza decisiones informadas, mayor control del proyecto y respaldo técnico sólido en cada etapa del proceso.",
    },
]

async function uploadImage(filename: string) {
    const filePath = path.join(__dirname, '../public/images', filename)
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Image not found: ${filename}`)
        return null
    }
    const buffer = fs.readFileSync(filePath)
    const asset = await client.assets.upload('image', buffer, { filename })
    return asset._id
}

async function seedServices() {
    console.log('🚀 Starting Services Migration (Individual Docs)...')

    // 1. Create Individual Service Documents
    for (const service of SERVICES_DATA) {
        console.log(`Processing service: ${service.title}...`)

        let imageRef = undefined
        if (service.imageFile) {
            const assetId = await uploadImage(service.imageFile)
            if (assetId) {
                imageRef = {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: assetId }
                }
            }
        }

        const docId = service.title.replace(/\W/g, '').toLowerCase()

        const serviceDoc = {
            _id: docId,
            _type: 'service', // Important: This creates a separate document
            title: service.title,
            description: service.description,
            icon: service.icon,
            features: service.features,
            image: imageRef,
            conclusion: service.conclusion,
            imagePosition: service.imagePosition,
            imageFit: service.imageFit,
        }

        await client.createOrReplace(serviceDoc)
    }

    // 2. Update the Singleton Config (Title/Subtitle only)
    const configDoc = {
        _id: 'servicesSection',
        _type: 'servicesSection',
        title: "Nuestras Soluciones",
        subtitle: "Tecnología de Vanguardia aplicada a la captura y procesamiento de datos geoespaciales",
    }

    console.log('💾 Saving Singleton Config...')
    await client.createOrReplace(configDoc)

    console.log('✅ Services seeded successfully (Documents + Config)!')
}

seedServices()
