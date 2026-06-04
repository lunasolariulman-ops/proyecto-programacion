import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, CardHeader, TextField, MenuItem,
  Button, Stack, Divider, Typography, Box, FormControl,
  FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, Select, InputLabel,
} from "@mui/material";
import { Person, BadgeOutlined, MenuBookOutlined, SaveOutlined } from "@mui/icons-material";

const AlumnoForm = ({ onGuardarAlumno }) => {
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
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
    <Card sx={{ maxWidth: 800, mx: "auto" }}>
      <CardHeader
        title={<Typography variant="h5" fontWeight={700}>Inscripción de alumno</Typography>}
        subheader="Completá los datos para inscribir al alumno a una materia"
      />
      <Divider />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>

            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <Person color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>Datos personales</Typography>
              </Stack>
              <TextField fullWidth required label="Nombre y apellido" name="nombre" value={formData.nombre} onChange={handleChange} />
            </Box>

            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <BadgeOutlined color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>Identificación</Typography>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField fullWidth required label="DNI" name="dni" value={formData.dni} onChange={handleChange} />
                <TextField fullWidth required type="email" label="Email" name="email" value={formData.email} onChange={handleChange} />
              </Stack>
            </Box>

            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <MenuBookOutlined color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>Materia y modalidad</Typography>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl sx={{ flex: 1 }} required>
                  <InputLabel>Materia</InputLabel>
                  <Select name="materia" value={formData.materia} label="Materia" onChange={handleChange}>
                    <MenuItem value="Programación I">Programación I</MenuItem>
                    <MenuItem value="Programación II">Programación II</MenuItem>
                    <MenuItem value="Base de Datos">Base de Datos</MenuItem>
                    <MenuItem value="Ingeniería de Software">Ingeniería de Software</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <InputLabel>Turno</InputLabel>
                  <Select name="turno" value={formData.turno} label="Turno" onChange={handleChange}>
                    <MenuItem value="Mañana">Mañana</MenuItem>
                    <MenuItem value="Tarde">Tarde</MenuItem>
                    <MenuItem value="Noche">Noche</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>Modalidad</FormLabel>
                  <RadioGroup row name="modalidad" value={formData.modalidad} onChange={handleChange}>
                    <FormControlLabel value="Presencial" control={<Radio />} label="Presencial" />
                    <FormControlLabel value="Virtual" control={<Radio />} label="Virtual" />
                  </RadioGroup>
                </FormControl>
              </Stack>
            </Box>

            <TextField
              fullWidth multiline rows={4}
              label="Observaciones" name="observaciones"
              value={formData.observaciones} onChange={handleChange}
            />

            <FormControlLabel
              control={<Checkbox name="aceptaReglamento" checked={formData.aceptaReglamento} onChange={handleChange} />}
              label="Acepto el reglamento de inscripción"
            />

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button variant="outlined" onClick={() => navigate('/')}>Volver</Button>
              <Button type="submit" variant="contained" startIcon={<SaveOutlined />}>Enviar inscripción</Button>
            </Stack>

          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlumnoForm;