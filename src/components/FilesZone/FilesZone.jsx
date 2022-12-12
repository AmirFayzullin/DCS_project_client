import React, {useState} from 'react';
import FilesView from "./FilesView/FilesView";
import FilesCatcher from "./FilesCatcher/FilesCatcher";
import s from './FilesZone.module.css';
import {DragStatusContext} from "../../contexts/DragStatusContext";

const FilesZone = ({removeFile, files, addFiles}) => {
    const [isDragStarted, setIsDragStarted] = useState(false);

    const handleDragEnter = () => {
        setIsDragStarted(true);
    };

    const handleDragLeave = () => {
        setIsDragStarted(false);
    };

    return (
        <DragStatusContext.Provider value={{
            isDragStarted,
            setIsDragStarted
        }}>
            <div className={s.wrapper}
                 onDragEnter={handleDragEnter}
                 onDragLeave={handleDragLeave}
            >
                <FilesView removeFile={removeFile} files={files}/>
                <FilesCatcher files={files} addFiles={addFiles}/>
            </div>
        </DragStatusContext.Provider>
    )
};

export default FilesZone;