

interface SeedData {
    entries: SeedEntry[]
}



interface SeedEntry {
    description: string
    status: string
    createdAt: number
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Esta es una tarea de prueba con el numero 1, texto de relleno',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'Progreso: Esta es una tarea de prueba con el numero 2, texto de relleno',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finalizado: Esta es una tarea de prueba con el numero 3, texto de relleno',
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ]
}