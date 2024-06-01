import { Route, Routes } from 'react-router-dom'

import Home from './component/Home';
import Administrador from './component/Administrador';
import SearchAlumnos from './component/SearchAlumno';
import Alumno from './component/Alumno';
import ListaAlumnos from './component/ListaAlumnos';
import Login from './component/Login';
import NavBar from './layers/NavBar';
import Page404 from './component/Page404';
import SubirArchivo from './component/SubirArchivo';

function App(){
  return(
    <div className="App">
      <Routes>
        <Route path='/' element={<SubirArchivo/>}/>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/administrador' element={<Administrador/>}/>
        <Route path='/search-page' element={<SearchAlumnos/>}/>
        <Route path='/alumnos/:alumno' element={<Alumno/>}></Route>
        <Route path='/lista-de-alumnos' element={<ListaAlumnos/>}></Route>
        <Route path='/NavBar'element={<NavBar/>}></Route>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </div>
  )
}

export default App