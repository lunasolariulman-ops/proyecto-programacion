import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Alert,
} from '@mui/material';
import { useUsuario } from '../contexts/UsuarioContext';

function Dashboard({ alumno }) {
    const navigate = useNavigate();
    const { usuario } = useUsuario();
    
    useEffect(() => {
        if (!usuario) {
            navigate('/login');
        }
    }, [usuario, navigate]);

    if (!usuario) {
        return null;
    }
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Dashboard
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    Bienvenido, {usuario.nombre}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Email: {usuario.email}
                </Typography>

                <Divider sx={{ mb: 2 }} />
                
                {alumno ? (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Última inscripción registrada
                        </Typography>
                        
                        <Typography><strong>Nombre:</strong> {alumno.nombre}</Typography>
                        <Typography><strong>DNI:</strong> {alumno.dni}</Typography>
                        <Typography><strong>Email:</strong> {alumno.email}</Typography>
                        <Typography><strong>Materia:</strong> {alumno.materia}</Typography>
                        <Typography><strong>Modalidad:</strong> {alumno.modalidad}</Typography>
                        <Typography><strong>Turno:</strong> {alumno.turno}</Typography>

                    </>
                ) : (
                    <Alert severity="info">
                        Todavía no hay ninguna inscripción registrada.
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}

export default Dashboard;