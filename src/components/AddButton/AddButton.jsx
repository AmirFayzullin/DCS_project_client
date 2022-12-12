import React from 'react'
import s from './AddButton.module.css';

const AddButton = ({addFiles}) => {
    return (
        <label className={s.label} htmlFor='fileInput'>
            <input onChange={(e) => addFiles(e.target.files)}
                   type="file"
                   multiple={true}
                   className={s.input}
                   id="fileInput"
            />
        </label>
    )
};

export default AddButton;