

import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    if ( process.env.NODE_ENV === 'production' ) {
        // No voy a purgar la base de datos
        return res.status(401).json({message: 'No tiene acceso a este recurso.'})
    }

    // SOLO EN DESARROLLO

    await db.connect();

    // Eliminar todos
    await Entry.deleteMany();
    // Insertar la data
    await Entry.insertMany( seedData.entries )

    await db.disconnect();

    res.json({message: 'Proceso realizado correctamente.'})

}