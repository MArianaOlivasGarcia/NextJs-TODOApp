

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {

    const id = req.page.params?.id || '';

    const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");


    if ( !checkMongoIDRegExp.test( id ) ) {
        // return res.status(400).json({ message: `El ID ${id} no es válido` })
        return new Response( JSON.stringify( { message: `El ID ${id} no es válido` } ), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    console.log('Middleware llamado')

    return NextResponse.next();
}