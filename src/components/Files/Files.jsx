import React from 'react';

export const Files = ({setFiles}) => {
    const onFilesChange = (e) => {
        setFiles(e.target.files);
    };

    return (
        <div>
            <input type="file"
                   onChange={onFilesChange}
                   multiple={true}
            />
        </div>
    )
};