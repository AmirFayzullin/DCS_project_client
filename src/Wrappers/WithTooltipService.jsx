import {useState} from "react";
import {TooltipServiceContext} from '../contexts/TooltipServiceContext';

export const WithTooltipService = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const open = ({message}) => {
        setIsOpen(true);
        setMessage(message);
    };

    const close = () => {
        setIsOpen(false);
    };

    return (
        <TooltipServiceContext.Provider value={{
            isOpen,
            message,
            open,
            close
        }}>
            {children}
        </TooltipServiceContext.Provider>
    )
};