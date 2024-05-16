import React, { useState, useEffect } from 'react';
import Alumno from './Alumno';

const Api = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/alumnos/listado/0')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                console.log("Consumido")
                return response.json();
            })
            .then((data) => {
                setAlumnos(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);
    console.log(alumnos)
    return (
        <div className="posts-container">
            {error && <div>Error: {error}</div>}
            {alumnos.map((alumno) => {
                return (
                    <div className="post-card" key={alumno.id}>
                        <h2 className="post-title">{alumno.nombre}</h2>
                        <p className="post-body">ID: {alumno.id}</p>
                        <p className="post-body">Email: {alumno.email}</p>

                    </div>
                );
            })}
        </div>
    );
};

export default Api;
