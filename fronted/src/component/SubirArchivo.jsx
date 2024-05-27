import React, { useState } from "react";
import { uploadFile } from "../services/uploadFile";
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

function SubirArchivo() {
    const [appStatus, setAppStatus] =useState(APP_STATUS.IDLE)
    const [file, setFile] = useState(null)
    const [Data , setData] = useState([])
    const[Count, setCount] = useState(null)
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
            const { error , data } = await uploadFile(file);
            if (error) {
                setAppStatus(APP_STATUS.ERROR);
                toast.error(error.message);
                return;
            }
            setAppStatus(APP_STATUS.READY_USAGE);
            console.log(data)
            setCount(data.data.length)

            setData(JSON.stringify(data,null,'\t'))
            toast.success('Archivo Subido Correctamente');

        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setAppStatus(APP_STATUS.ERROR);
            toast.error('Error al procesar la solicitud');
        }
        
    };
    console.log(Data)
    console.log(Count)

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
            <div style={{ display: (appStatus === APP_STATUS.UPLOADING || appStatus === APP_STATUS.IDLE || appStatus === APP_STATUS.ERROR || appStatus === APP_STATUS.READY_UPLOAD) ? 'none' : 'block' }}>

            </div>
        </>
    );
}

export default SubirArchivo;