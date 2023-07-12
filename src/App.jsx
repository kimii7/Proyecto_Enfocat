
 import { Routes, Route } from "react-router-dom";


 import Home from "./components/Home"
 import About from "./components/About"
 import Contact from "./components/Contact"
 
 import PaginaInicio from "./components/PaginaInicio";
 import ContactoInicio from "./components/ContactoInicio"
import Login from "./components/Login";
import Registro from "./components/Registro";



import Layout from "./components/Layout"


function App() {


  return (
    <>

      
      
      
      
      
      
       <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto/inicio" element={<ContactoInicio />} />
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/layout" element={<Layout />} >
          <Route path="/layout" element={<Home />} />
          
          <Route path="/layout/about" element={<About />} />
          <Route path="/layout/contact" element={<Contact />} />
        
        </Route>

      </Routes>   
      
    </>
  )
}

export default App
