import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Database/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from './Views/Login';
import Encabezado from "./Components/Encabezado";
import Inicio from "./Views/Inicio";
import './App.css';
import Emprendedores from "./Views/Emprendedores";
import Financieras from "./Views/Financieras";
import Productos from "./Views/Productos";
import Categorias from "./Views/Categorias";
import Programas from "./Views/Programas";
import CardTaller from './Components/CardTaller/CardTaller';// Importación agregad


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
                <Route path="/Emprendedores" element={<ProtectedRoute element={<Emprendedores />} />} />
                <Route path="/Financieras" element={<ProtectedRoute element={<Financieras />} />} />
                <Route path="/Productos" element={<ProtectedRoute element={<Productos />} />} />
                <Route path="/Categorias" element={<ProtectedRoute element={<Categorias />} />} />
                <Route path="/Programas" element={<ProtectedRoute element={<Programas />} />} />
                <Route
                  path="/CardTaller"
                  element={
                    <CardTaller
                      titulo="Taller de Marketing"
                      imagen="https://tse1.mm.bing.net/th/id/OIP.jHBi_ibBabDxOOex7BuZaAHaES?w=800&h=464&rs=1&pid=ImgDetMain"
                      descripcion="Este es un taller te ayudará a comprender todo lo que necesites en Marketing"
                      tags={["Marketing en Redes"]}
                      video="https://youtu.be/hgqRvnyjQak?si=BiWhjGLMNi-UnoYr"
                    />
                  } />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;