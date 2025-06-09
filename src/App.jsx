import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Database/AuthContext";
import { CarritoProvider } from "./Components/Carrito/CarritoContext"; //
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from './Views/Login';
import Encabezado from "./Components/Encabezado";
import Inicio from "./Views/Inicio";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Emprendedores from "./Views/Emprendedores";
import Financieras from "./Views/Financieras";
import Productos from "./Views/Productos";
import Categorias from "./Views/Categorias";
import Programas from "./Views/Programas";
import Negocios from "./Views/Negocios";
import Catalogo from "./Views/Catalogo"

import Estadisticas from "./Views/Estadisticas";
import Clientes from "./Views/Clientes";
import Ventas from "./Views/Ventas";
import Carrito from "./Components/Carrito/Carrito"; //
import HistorialVentas from "./Views/HistorialVentas";
import Talleres from "./Views/Talleres";

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <div className="App">
            <Encabezado />
            <main>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Inicio" element={<ProtectedRoute element={<Inicio />} roles={["Administrador", "Emprendedor", "Financieras", "Cliente"]}/>} />
                <Route path="/Emprendedores" element={<ProtectedRoute element={<Emprendedores />} roles={["Administrador", "Emprendedor"]} />} />
                <Route path="/Financieras" element={<ProtectedRoute element={<Financieras />} roles={["Administrador", "Financieras"]} />} />
                <Route path="/Productos" element={<ProtectedRoute element={<Productos />} roles={["Administrador", "Emprendedor"]} />} />
                <Route path="/Categorias" element={<ProtectedRoute element={<Categorias />} roles={["Administrador", "Emprendedor"]} />} />
                <Route path="/Programas" element={<ProtectedRoute element={<Programas />} roles={["Administrador", "Financieras"]} />} />
                <Route path="/Negocios" element={<ProtectedRoute element={<Negocios />} roles={["Administrador", "Emprendedor"]} />} />
                <Route path="/Catalogo" element={<ProtectedRoute element={<Catalogo />} roles={["Administrador","Cliente", "Emprendedor", "Financiera"]} />} />
                <Route path="/Estadisticas" element={<ProtectedRoute element={<Estadisticas />} roles={["Administrador", "Emprendedor"]} />} />
                <Route path="/Clientes" element={<ProtectedRoute element={<Clientes />} roles={["Administrador", "Emprendedor"]} />} />
                <Route path="/Ventas" element={<ProtectedRoute element={<Ventas />} roles={["Administrador", "Emprendedor"]} />} />
                <Route path="/HistorialVentas" element={<ProtectedRoute element={<HistorialVentas />} roles={["Administrador", "Emprendedor"]} />} />
                <Route path="/Carrito" element={<ProtectedRoute element={<Carrito />} roles={["Administrador", "Emprendedor", "Cliente"]} />} />
                <Route path="/Talleres" element={<ProtectedRoute element={<Talleres />} roles={["Administrador", "Emprendedor", "Financieras"]} />} />
                
              </Routes>
            </main>
          </div>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;