import {createContext} from 'react';

export const DragStatusContext = createContext({
    isDragStarted: false,
    setIsDragStarted: () => null
});