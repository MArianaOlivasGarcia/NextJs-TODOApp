


import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'


export interface UIState {
    sidemenuOpen: boolean,
    isAddingEntry: boolean
    isDragging: boolean
}


const UI_INIT_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}


export const UIProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INIT_STATE);

    const openSidemenu = () => {
        dispatch({ type: '[UI] - Open sidemenu' })
    }

    const setIsAddingEntry = ( value: boolean ) => {
        dispatch({ type: '[UI] - Is Adding Entry', payload: value })
    }

    const setIsDragging = ( value: boolean ) => {
        dispatch({ type: '[UI] - Is Dragging', payload: value })
    }


    const closeSidemenu = () => dispatch({ type: '[UI] - Close sidemenu' })

    return (
        <UIContext.Provider value={{ 
            // sidemenuOpen: state.sidemenuOpen
            ...state,

            // Methods
            closeSidemenu,
            openSidemenu,
            setIsAddingEntry,
            setIsDragging
        }}>
            { children }
        </UIContext.Provider>
    )

}