import { Card, CardContent, TextField, Button, Stack, Typography, Box, InputAdornment } from "@mui/material";
import { LockOutlined, EmailOutlined, Login as LoginIcon } from "@mui/icons-material";
import { useState } from "react";
// import { useUsuario } from "../contexts/UsuarioContext";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  // const { login } = useUsuario();

  const handle = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // login(data); // 👉 mantené tu lógica original
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
      <Card sx={{ width: "100%", maxWidth: 420 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} component="form" onSubmit={onSubmit}>
            <Stack alignItems="center" spacing={1}>
              <LockOutlined color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h5" fontWeight={700}>Iniciar sesión</Typography>
              <Typography variant="body2" color="text.secondary">Accedé con tu cuenta</Typography>
            </Stack>

            <TextField
              fullWidth required label="Email" name="email" type="email"
              value={data.email} onChange={handle}
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlined fontSize="small" /></InputAdornment> }}
            />
            <TextField
              fullWidth required label="Contraseña" name="password" type="password"
              value={data.password} onChange={handle}
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