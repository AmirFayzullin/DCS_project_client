import React, {useContext} from 'react';
import s from './FilesView.module.css'
import File from "./File/File";
import {DragStatusContext} from "../../../contexts/DragStatusContext";
import cn from 'classnames';

const FilesView = ({removeFile, files}) => {

    const dragStatus = useContext(DragStatusContext);

    const filesElements = files.map(file => {
        return <File removeFile={() => removeFile(file.name)} file={file} key={file.name}/>
    });

    return (
        <div className={cn(s.wrapper, {[s.hidden]: dragStatus.isDragStarted})}>
            {filesElements}
        </div>
    )
};

export default FilesView;