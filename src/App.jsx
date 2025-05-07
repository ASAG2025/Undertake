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
import Programas from "./Views/Programas"; // Importación agregada

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
                      formato="Web"
                      link="https://www.udemy.com/course/learn-digital-marketing-course/?utm_source=bing&utm_medium=udemyads&utm_campaign=BG-Search_Keyword_Beta_Prof_la.EN_cc.ROW-English&campaigntype=Search&portfolio=Bing-ROW-English&language=EN&product=Course&test=&audience=Keyword&topic=Digital_Marketing&priority=Beta&utm_content=deal4584&utm_term=_._ag_1327112923143613_._ad__._kw_internet%20marketing_._de_c_._dm__._pl__._ti_kwd-82945677943038:loc-135_._li_152599_._pd__._&matchtype=p&msclkid=fcd283cfb35e173a5367ebc10cfceb83"
                      tags={["Finanzas"]}
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