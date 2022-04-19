
import { UIState } from './';


type UIActionType = 
| { type: '[UI] - Open sidemenu' }
| { type: '[UI] - Close sidemenu' }
| { type: '[UI] - Is Adding Entry', payload: boolean }
| { type: '[UI] - Is Dragging', payload: boolean }


export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {


    switch ( action.type ) {

        case '[UI] - Open sidemenu':
            return {
                ...state,
                sidemenuOpen: true
            };

        case '[UI] - Close sidemenu':
            return {
                ...state,
                sidemenuOpen: false
            };


        case '[UI] - Is Adding Entry':
            return {
                ...state,
                isAddingEntry: action.payload
            };

        case '[UI] - Is Dragging':
            return {
                ...state,
                isDragging: action.payload
            };

        default:
            return state;
    }


}