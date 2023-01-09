import React from 'react';
import {SliderInput} from "../common/SliderInput/SliderInput";
import s from './Settings.module.css';
import cn from 'classnames';
import Input from "../common/Input/Input";
import {Checkbox} from "../common/Checkbox/Checkbox";

export const Settings = ({settings, setSettings, withSettings, setWithSettings, activeSetting, setActiveSetting}) => {

    const handleCompressionChange = (e) => {
        const value = e.target.value;
        if (value < 0 || value > 100) return;

        setSettings(s => ({
            ...s,
            quality: value
        }));
        setActiveSetting("QUALITY");
        setWithSettings(true);
    };

    const handleMaxSizeChange = (e) => {
        const value = e.target.value;
        if (value < 0) return;

        setSettings(s => ({
            ...s,
            maxSize: value
        }));
        setActiveSetting("MAX_SIZE");
        setWithSettings(true);
    };

    return (
        <div className={s.wrapper}>
            Settings
            <div className={cn(s.optionWrapper, {[s.inactive]: activeSetting !== "QUALITY" || !withSettings})}>
                <p className={s.optionTitle}>Quality:</p>
                <div className={s.optionPicker}>
                    <SliderInput min={0} max={100} step={1} value={settings.quality || 0} onChange={handleCompressionChange}/>
                    <Input min={0} max={100} type="number" onChange={handleCompressionChange} value={settings.quality || 0} name={null}/>
                </div>
            </div>
            <div className={cn(s.optionWrapper, {[s.inactive]: activeSetting !== "MAX_SIZE" || !withSettings})}>
                <p className={s.optionTitle}>Max file size(mb):</p>
                <div className={s.optionPicker}>
                    <Input min={0}
                           type="number"
                           onChange={handleMaxSizeChange}
                           value={settings.maxSize || 0}
                           style={{
                               gridColumn: "1/3"
                           }}
                           name={null}
                    />
                </div>
            </div>

            <div className={s.optionWrapper}>
                <div className={s.disableSettings}>
                    <Checkbox checked={!withSettings}
                              onChange={() => setWithSettings(c => !c)}
                              value={".."}
                    />
                    <p>Disable settings</p>
                </div>
            </div>
        </div>
    )
};