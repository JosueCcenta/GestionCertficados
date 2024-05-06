import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './component/Home';
import Administrador from './component/Administrador';
import SearchAlumnos from './component/SearchAlumno';
import Alumno from './component/Alumno';
import Api from './component/Api';

function App(){
  return(
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/administrador' element={<Administrador/>}/>
        <Route path='/search-page' element={<SearchAlumnos/>}/>
        <Route path='/alumnos/:alumno' element={<Alumno/>}></Route>
        <Route path='/api' element={<Api/>}></Route>
      </Routes>
    </div>
  )
}

export default App