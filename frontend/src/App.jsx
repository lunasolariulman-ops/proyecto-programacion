import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AlumnoForm from './components/AlumnoForm';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [alumno, setAlumno] = useState(null);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home alumno={alumno} />} />
        <Route
          path="/registro"
          element={<AlumnoForm onGuardarAlumno={setAlumno} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard alumno={alumno} />} />
      </Routes>
    </Layout>
  );
}

export default App;