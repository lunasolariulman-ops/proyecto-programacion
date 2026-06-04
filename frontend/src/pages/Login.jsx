import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Stack, Typography, Box, InputAdornment } from "@mui/material";
import { LockOutlined, EmailOutlined, Login as LoginIcon } from "@mui/icons-material";
import { useUsuario } from '../contexts/UsuarioContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUsuario();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioSimulado = {
      nombre: 'Alumno Demo',
      email: email,
    };
    login(usuarioSimulado);
    navigate('/dashboard');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <Stack alignItems="center" spacing={1}>
              <LockOutlined color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h5" fontWeight={700}>Iniciar sesión</Typography>
              <Typography variant="body2" color="text.secondary">
                Ingresá tus datos para simular el acceso al sistema.
              </Typography>
            </Stack>

            <TextField
              fullWidth required label="Email" type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlined fontSize="small" /></InputAdornment> }}
            />
            <TextField
              fullWidth required label="Contraseña" type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlined fontSize="small" /></InputAdornment> }}
            />

            <Button type="submit" variant="contained" size="large" startIcon={<LoginIcon />}>
              Ingresar
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;