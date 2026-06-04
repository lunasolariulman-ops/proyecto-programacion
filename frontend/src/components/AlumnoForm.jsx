import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';

function AlumnoForm({ onGuardarAlumno }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        dni: '',
        email: '',
        materia: '',
        modalidad: 'Presencial',
        turno: 'Mañana',
        observaciones: '',
        aceptaReglamento: false,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData({
            ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.aceptaReglamento) {
            alert('Debe aceptar el reglamento para continuar');
            return;
        }
        onGuardarAlumno(formData);
        navigate('/');
    };
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Formulario de inscripción
                </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Nombre y apellido"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="DNI"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Materia</InputLabel>
                    <Select
                        name="materia"
                        value={formData.materia}
                        label="Materia"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Programación I">Programación I</MenuItem>
                        <MenuItem value="Programación II">Programación II</MenuItem>
                        <MenuItem value="Base de Datos">Base de Datos</MenuItem>
                        <MenuItem value="Ingeniería de Software">Ingeniería de Software</MenuItem>
                    </Select>
                </FormControl>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <FormLabel>Modalidad</FormLabel>
                            <RadioGroup
                                row
                                name="modalidad"
                                value={formData.modalidad}                                    onChange={handleChange}
                            >
                                <FormControlLabel value="Presencial" control={<Radio />} label="Presencial" />
                                <FormControlLabel value="Virtual" control={<Radio />} label="Virtual" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ mt: 3 }}>
                            <InputLabel>Turno</InputLabel>
                            <Select
                                name="turno"
                                value={formData.turno}
                                label="Turno"
                                onChange={handleChange}
                            >
                                <MenuItem value="Mañana">Mañana</MenuItem>
                                <MenuItem value="Tarde">Tarde</MenuItem>
                                <MenuItem value="Noche">Noche</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Observaciones"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    margin="normal"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            name="aceptaReglamento"
                            checked={formData.aceptaReglamento}
                            onChange={handleChange}
                        />
                        }
                        label="Acepto el reglamento de inscripción"
                    />
                    
                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Enviar inscripción
                        </Button>
    
                        <Button variant="outlined" onClick={() => navigate('/')}>
                            Volver
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AlumnoForm;