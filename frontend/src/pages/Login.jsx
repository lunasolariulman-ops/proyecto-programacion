import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
Box,
Button,
Card,
CardContent,
TextField,
Typography,
} from '@mui/material';
import { useUsuario } from '../contexts/UsuarioContext';

function Login() {
    const navigate = useNavigate();
    const { login } = useUsuario();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const usuarioSimulado = {
            nombre: 'Alumno Demo',
            email: email,
        };
        login(usuarioSimulado);
        navigate('/dashboard');
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                Iniciar sesión
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }}>
                    Ingresá tus datos para simular el acceso al sistema.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                    />
                
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                    />

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Ingresar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
export default Login;