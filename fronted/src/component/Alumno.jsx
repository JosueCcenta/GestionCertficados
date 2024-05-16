import React from "react"
import { useParams } from "react-router"


const Alumno = ()=> {
    const { alumno } = useParams()
  
    return(
      <h1>hola {alumno}</h1>
    )
  }

  export default Alumno
  