import React, {useContext, useEffect, useState} from 'react';
import s from './Main.module.css';
import cn from 'classnames';
import {Settings} from "../Settings/Settings";
import {api, wsApi} from "../../index";
import {ApiContext} from "../../contexts/ApiContext";
import download from "downloadjs";
import FilesZone from "../FilesZone/FilesZone";
import AddButton from "../AddButton/AddButton";
import {TooltipServiceContext} from "../../contexts/TooltipServiceContext";

export const Main = () => {
    const [settings, setSettings] = useState({
        quality: 80,
        maxSize: 20
    });
    const [files, setFiles] = useState([]);
    const [withSettings, setWithSettings] = useState(false);
    const [activeSetting, setActiveSetting] = useState("QUALITY");
    const [isLoading, setIsLoading] = useState(false);
    const [readyDownload, setReadyDownload] = useState(false);
    const {wsApi} = useContext(ApiContext);

    const {open: openTooltip} = useContext(TooltipServiceContext);

    const removeFile = (filename) => {
        setFiles(fList => fList.filter(f => f.name !== filename));
    };

    const addFiles = (newFiles) => {
        setFiles(files => [...files, ...newFiles])
    };

    const send = () => {
        const formData = new FormData();

        for (let file of files) {
            formData.append(file.name, file);
        }

        if (withSettings) {
            if (activeSetting === "MAX_SIZE") formData.append("maxSize", settings.maxSize);
            else if (activeSetting === "QUALITY") formData.append("quality", settings.quality);
        }

        setIsLoading(true);
        api.sendImages(formData)
            .then(res => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                openTooltip({
                    message: `Something went wrong during uploading your files :((`
                });
                setIsLoading(false);
            })
    };

    useEffect(() => {
        const removeListeners = wsApi.setListeners({
            message: (e) => {
                const {event, payload} = JSON.parse(e.data);

                if (event === "PROCESSING_FINISHED") {
                    if (payload.status === "OK") setReadyDownload(true);
                    else openTooltip({
                        message: `Something went wrong during processing your files :((`
                    });
                    setIsLoading(false);
                    console.log(payload.status);
                }
            },
            close: () => {
                removeListeners();
            }
        });

        return () => {
            removeListeners();
        }
    }, []);

    const downloadFile = () => {
        api.download()
            .then(blobData => {
                download(blobData, 'output.pdf', blobData.type);
            })
            .catch(e => {
                console.log(e);
            })
    };

    const reset = () => {
        if (files.length === 0 || isLoading) return;

        setFiles([]);
        setReadyDownload(false);
        setIsLoading(false);

    };

    let handleButtonClick = () => null;

    if (isLoading) handleButtonClick = () => null;
    if (!isLoading && !readyDownload) handleButtonClick = send;
    if (!isLoading && readyDownload) handleButtonClick = downloadFile;

    return (
        <div className={s.wrapper}>
            <div className={cn(s.section, s.filesSection)}>
                <FilesZone removeFile={removeFile} files={files} addFiles={addFiles}/>
            </div>
            <div className={s.section}>
                <Settings settings={settings}
                          setSettings={setSettings}
                          withSettings={withSettings}
                          setWithSettings={setWithSettings}
                          activeSetting={activeSetting}
                          setActiveSetting={setActiveSetting}
                />
                <div className={cn(s.sendButton, {[s.inactive]: files.length === 0})}
                     onClick={handleButtonClick}
                >
                    {
                        isLoading && "Loading..."
                    }
                    {
                        !isLoading && !readyDownload && "Send"
                    }
                    {
                        !isLoading && readyDownload && "Download"
                    }
                </div>
            </div>
            <div className={cn(s.section, s.controlButtons)}>
                <div className={cn(s.resetButton, {[s.active]: files.length !== 0 && !isLoading})}
                     onClick={() => reset()}
                >
                </div>
                <AddButton addFiles={addFiles}/>
            </div>
        </div>
    )
};