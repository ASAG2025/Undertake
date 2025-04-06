import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Database/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute"; 
import Login from './Views/Login'
import Encabezado from "./Components/Encabezado";
import Inicio from "./Views/Inicio";
import './App.css'
import Emprendedores from "./Views/Emprendedores";
import Financieras from "./Views/Financieras";
import Productos from "./Views/Productos"

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <div className="App">
            <Encabezado />
            <main>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/inicio" element={<ProtectedRoute element={<Inicio />} />} />
                <Route path="/Emprendedores" element={<ProtectedRoute element={<Emprendedores />} />}/> 
                <Route path="/Financieras" element={<ProtectedRoute element={<Financieras />} />}/>
                <Route path="/Productos" element={<ProtectedRoute element={<Productos />} />}/>
                <Route path="/Categorias" element={<ProtectedRoute element={<Categorias />} />}/>
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
