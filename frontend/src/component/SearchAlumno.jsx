import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchAlumnos = () => {
  const [contador, setContador] = useState(0); 

  const incrementarContador = () => {
    setContador(contador + 1);
  };

  const decrementarContador = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  const alumnos = ['josue', 'renato', 'tiago', 'enrique', 'helmer', 'sergio'];

  return (
    <div>
      <h1>Search Page</h1>
      <p>Contador: {contador}</p> 
      <button onClick={incrementarContador}>Incrementar</button> 
      <button onClick={decrementarContador}>Decrementar</button>
      <ul>
        {alumnos.map(alumno => (
          <li key={alumno}>
            <Link to={`/alumnos/${alumno}`}>{alumno}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchAlumnos;
