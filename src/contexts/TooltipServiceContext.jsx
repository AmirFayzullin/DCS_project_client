import React from "react";

export const TooltipServiceContext = React.createContext({
    message: "",
    isOpen: false,
    open: ({message}) => console.log("Open func of tooltip service is not defined"),
    close: () => console.log("Close func of tooltip service is not defined"),
});