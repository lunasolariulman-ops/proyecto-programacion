import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuario } from '../../contexts/UsuarioContext';
import { useTema } from '../../contexts/TemaContext';

function Navbar() {
    const navigate = useNavigate();
    const { usuario, logout } = useUsuario();
    const { tema, toggleTema } = useTema();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Inscripción Alumnos
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/">
                        Inicio
                    </Button>

                    <Button color="inherit" component={Link} to="/registro">
                        Registrar
                    </Button>
                    
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>
                    
                    <Button color="inherit" onClick={toggleTema}>
                        Tema: {tema}
                    </Button>               

                    {usuario ? (
                        <>
                            <Typography variant="body2" sx={{ ml: 2 }}>
                                Hola, {usuario.nombre}
                            </Typography>

                            <Button color="inherit" onClick={handleLogout}>
                                Salir
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                    )}      
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;