import {TooltipServiceContext} from "../../contexts/TooltipServiceContext";
import React, {useContext} from "react";
import {Tooltip} from "./Tooltip";

export const TooltipContainer = () => {
    const {close, isOpen, message} = useContext(TooltipServiceContext);

    return (
        <Tooltip message={message} close={close} isOpen={isOpen}/>
    )
};