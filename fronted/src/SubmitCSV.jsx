import React, { useState } from "react";
import './SubmitCSV.css';
import { uploadFile } from "./services/upload";
import { Toaster, toast } from "sonner";

const APP_STATUS = {
    IDLE : 'idle',
    ERROR: 'error',
    READY_UPLOAD: 'ready_upload',
    UPLOADING: 'uploading',
    READY_USAGE: 'ready_usage'
}

const BUTTON_TEXT = {
    [APP_STATUS.READY_UPLOAD] : 'Subir Archivo',
    [APP_STATUS.UPLOADING] : 'Subiendo.....',
}

function SubmitCSV() {
    const [appStatus, setAppStatus] =useState(APP_STATUS.IDLE)
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if(file){
            setFile(file)
            setAppStatus(APP_STATUS.READY_UPLOAD)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (appStatus !== APP_STATUS.READY_UPLOAD || !file) {
            return;
        }
        setAppStatus(APP_STATUS.UPLOADING);
    
        try {
            const { error, data } = await uploadFile(file);
            if (error) {
                setAppStatus(APP_STATUS.ERROR);
                toast.error(error.message);
                return;
            }
    
            setAppStatus(APP_STATUS.READY_USAGE);
            if (data) {
                setData(data);
            }
            toast.success('Archivo Subido Correctamente');
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setAppStatus(APP_STATUS.ERROR);
            toast.error('Error al procesar la solicitud');
        }
    };
    
    
    const showButton = appStatus == APP_STATUS.READY_UPLOAD || appStatus == APP_STATUS.UPLOADING

    return (
        <>
        <Toaster/>
            <h4>Subir el archivo CSV</h4>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    <input 
                    disabled = {appStatus == APP_STATUS.UPLOADING}
                    onChange={handleInputChange} 
                    name="file" 
                    type="file" 
                    required accept=".csv"/>
                </label>
                {showButton && (<button disabled={appStatus == APP_STATUS.UPLOADING}>{BUTTON_TEXT[appStatus]}</button>)}
            </form>
        </>
    );
}

export default SubmitCSV;