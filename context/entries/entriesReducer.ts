


import { Entry } from '../../interfaces';
import { EntriesState } from './';


type EntriesActionType = 
| { type: '[Entries] - Create', payload: Entry }
| { type: '[Entries] - Update', payload: Entry }
| { type: '[Entries] - RefreshData', payload: Entry[] }


export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {


    switch ( action.type ) {

        case '[Entries] - Create':
            return {
                entries: [ ...state.entries, action.payload ]
            };
        
        case '[Entries] - Update':
            return {
                entries: state.entries.map( entry => {

                    if ( entry._id === action.payload._id ) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }

                    return entry;
                })
            };

        case '[Entries] - RefreshData':
            return {
                ...state,
                entries: [...action.payload]
            }

        default:
            return state;
    }


}