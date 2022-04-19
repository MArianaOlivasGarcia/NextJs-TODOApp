import { List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from "react"
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"
import { EntryStatus } from "../../interfaces"
import { EntryListItem } from "./"

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext( EntriesContext )

    const { isDragging, setIsDragging } = useContext( UIContext )

    
    // Memorizar las entradas a menos que cambie de status
    // funcion regresa el valor que queremos memorizar
    const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ), [entries])

    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
        // AQui podria evitar que ciertas trajetas no puedas dejar caer aqui, o solo algunas, etc
    }

    const onDrop = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find( entry => entry._id === id )!;

        entry.status = status

        updateEntry( entry );

        setIsDragging(false);

    }
    
    return (
        //   Hacer el drop
        <div
            onDrop={ onDrop }
            onDragOver={ allowDrop }
            className={ isDragging ? styles.dragging : '' }
        >
            <Paper sx={{ 
                height: 'calc(100vh - 250px)',
                overflow: 'scroll',
                backgroundColor: 'transparent',
                padding: 1
            }}>
                <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all 0.3s' }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryListItem 
                                key={ entry._id }
                                entry={ entry }
                            />
                        ))
                    }
                    
                </List>
            </Paper>
        </div>
    )
}
