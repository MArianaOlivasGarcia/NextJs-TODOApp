

import { FC, useEffect, useReducer } from 'react'
import { useSnackbar } from "notistack";
import { entriesApi } from '../../apis'
import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'


export interface EntriesState {
    entries: Entry[]
}


const Entries_INIT_STATE: EntriesState = {
    entries: []
}


export const EntriesProvider: FC = ({ children }) => {

    const { enqueueSnackbar } = useSnackbar();


    const [state, dispatch] = useReducer(entriesReducer, Entries_INIT_STATE);


    const addNewEntry = async( description: string ) => {

        const { data } = await  entriesApi.post<Entry>('/entries', {
            description
        })

        dispatch( { type: '[Entries] - Create', payload: data } )

    }



    const updateEntry = async( { _id, description, status }: Entry ) => {

        try {
            const { data } = await  entriesApi.put<Entry>(`/entries/${ _id }`, { description, status } )
            dispatch( { type: '[Entries] - Update', payload: data } )

            enqueueSnackbar('Actualizado con éxito', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                }
            })

        } catch (error) {
            console.log({error});
        }


    }



    // OBTENER TODAS LAS ENTRADAS A API
    // sin dependencias para que solo se ejecute 1 vez
    useEffect(() => {
        refreshEntries();
    }, [])


    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entries] - RefreshData', payload: data })
    }


    return (
        <EntriesContext.Provider value={{ 
            ...state,

            // methods:
            addNewEntry,
            updateEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )

}