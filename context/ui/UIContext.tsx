

import { createContext } from 'react';


interface ContextProps {
    sidemenuOpen: boolean,
    isAddingEntry: boolean,
    isDragging: boolean,

    // methods
    openSidemenu: () => void,
    closeSidemenu: () => void,
    setIsAddingEntry: (value: boolean) => void 
    setIsDragging: (value: boolean) => void 
}


export const UIContext = createContext({} as ContextProps );