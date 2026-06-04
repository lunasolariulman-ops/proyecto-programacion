import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography,
} from '@mui/material';

function Home({ alumno }) {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Sistema de inscripción de alumnos
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
                Esta aplicación permite registrar la inscripción de un alumno a una materia.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/registro')}
            >
                Registrar alumno
            </Button>

            <Box sx={{ mt: 4 }}>
                {alumno ? (
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Resumen de inscripción
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            <Stack spacing={1}>
                                <Typography><strong>Nombre:</strong> {alumno.nombre}</Typography>
                                <Typography><strong>DNI:</strong> {alumno.dni}</Typography>
                                <Typography><strong>Email:</strong> {alumno.email}</Typography>
                                <Typography><strong>Observaciones:</strong> {alumno.observaciones || '—'}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Chip label={alumno.materia} color="primary" />
                                <Chip label={alumno.modalidad} color="secondary" />
                                <Chip label={alumno.turno} />
                            </Stack>
                        </CardContent>
                    </Card>
                ) : (
                    <Alert severity="info">
                        Todavía no hay ninguna inscripción cargada.
                    </Alert>
                )}
            </Box>
        </Box>
    );
}

export default Home;