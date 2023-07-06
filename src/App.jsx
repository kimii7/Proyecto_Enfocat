
import { Routes, Route } from "react-router-dom";


import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Layout from "./components/Layout"







function App() {


  return (
    <>
      <h1 className="bg-indigo-200 text-center text-white">Routes</h1>
      
      <Routes>
        
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        
        </Route>

      </Routes>
    </>
  )
}

export default App
