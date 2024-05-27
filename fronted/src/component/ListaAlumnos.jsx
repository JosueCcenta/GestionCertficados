import React from 'react';
import { useFetch } from '../services/useFetch';
function ListaAlumnos(){
    const {data, loading, error} = useFetch("http://localhost:3000/alumnos/listado/0")
    return(
        <>
        <div className="AlumnosLista">
            <h1>Lista de alumnos</h1>
            <div className="card">
                <ul>
                    {error && <li>Error: {error}</li>}
                    {loading && <li>Loading...</li>}
                    {data && data[0] && data[0].map(alumno => (
                        <div key={alumno.id}>
                            <li key={alumno.nombre}>{alumno.nombre}</li>
                            <li key={alumno.apellido}>{alumno.apellido}</li>
                            <button >Actualizar</button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}

export default ListaAlumnos;
