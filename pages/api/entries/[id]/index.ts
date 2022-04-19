


import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data = 
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;

    // if ( !mongoose.isValidObjectId( id ) ) {
    //     return res.status(400).json({ message: `El ID ${id} no es válido` })
    // }

    switch ( req.method ) {

        case 'GET':
            return getById( req, res );


        case 'PUT':
            return updateEntry( req, res );

        default:
            return res.status(400).json({ message: 'Endpoit no existe' })
    }

}



const getById = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    
    const { id } = req.query;

    await db.connect();

    const entry = await Entry.findById( id );

    if ( !entry ) {
        await db.disconnect();
        return res.status(404).json( {message: `No existe una entry con el ID ${id}` } );
    }

    await db.disconnect();
    
    res.status(200).json( entry )

}





const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const exist = await Entry.findById( id );

    if ( !exist ) {
        await db.disconnect();
        return res.status(404).json( {message: `No existe una entry con el ID ${id}` } );
    }

    // Si no trae valores usar los que actualmente tiene
    const {
        description = exist.description,
        status = exist.status
    } = req.body

    try {


        const entry = await Entry.findByIdAndUpdate( id, { description, status }, {runValidators: true, new: true} );
        await db.disconnect();

        res.status(200).json( entry! )

        
    } catch (error: any) {
        await db.disconnect();

        console.log(error)
        return res.status(400).json( {message: error.errors.status.message } );

    }

}