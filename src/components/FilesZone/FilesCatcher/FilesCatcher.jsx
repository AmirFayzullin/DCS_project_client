import React, {useContext, useState} from 'react'
import s from './FilesCatcher.module.css'
import {DragStatusContext} from "../../../contexts/DragStatusContext";
import cn from 'classnames';

const FilesCatcher = ({files, addFiles}) => {
    const {isDragStarted} = useContext(DragStatusContext);
    const [isDragOver, setIsDragOver] = useState(false);

    const overridePreventDefaults = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = () => {
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        setIsDragOver(false);
        addFiles(event.dataTransfer.files);
    };


    return (
        <div
            onDragEnter={overridePreventDefaults}
            onDragOver={overridePreventDefaults}
            onDragLeave={overridePreventDefaults}
            onDrop={overridePreventDefaults}
        >

            <div
                className={cn(s.dropZone, {
                    [s.visible]: files.length === 0 || isDragStarted || isDragOver,
                    [s.active]: isDragOver
                })}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                Drop files here
            </div>
        </div>
    )

};

export default FilesCatcher