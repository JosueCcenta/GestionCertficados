import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './component/Home';
import Administrador from './component/Administrador';
import SearchAlumnos from './component/SearchAlumno';
import Alumno from './component/Alumno';
import Api from './component/Api';
import Login from './component/Login';
import NavBar from './layers/NavBar';
import SubmitCSV from './SubmitCSV';

function App(){
  return(
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/administrador' element={<Administrador/>}/>
        <Route path='/search-page' element={<SearchAlumnos/>}/>
        <Route path='/alumnos/:alumno' element={<Alumno/>}></Route>
        <Route path='/api' element={<Api/>}></Route>
        <Route path='/NavBar'element={<NavBar/>}></Route>
        <Route path='/SubmitCSV' element={<SubmitCSV/>}/>
      </Routes>
    </div>
  )
}

export default App