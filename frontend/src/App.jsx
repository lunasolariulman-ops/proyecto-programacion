import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TemaProvider } from "./contexts/TemaContext";
import { UsuarioProvider } from "./contexts/UsuarioContext";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import AlumnoForm from "./components/AlumnoForm";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <TemaProvider>
    <UsuarioProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registro" element={<AlumnoForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UsuarioProvider>
  </TemaProvider>
);

export default App;
