import {
  Card, CardContent, CardHeader, Grid, TextField, MenuItem,
  Button, Stack, Divider, Typography, Box,
} from "@mui/material";
import { Person, BadgeOutlined, MenuBookOutlined, SaveOutlined 
} from "@mui/icons-material";
import { useState } from "react";

const materias = ["Matemática", "Programación", "Historia", "Inglés"];

const AlumnoForm = () => {
  // 👉 Reemplazá este state por el tuyo si ya lo tenés
  const [form, setForm] = useState({ nombre: "", apellido: "", dni: "", email: "", materia: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👉 mantené acá tu lógica original
    console.log("Inscribir:", form);
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
                <PersonOutline color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>Datos personales</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth required label="Nombre" name="nombre" value={form.nombre} onChange={handle} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth required label="Apellido" name="apellido" value={form.apellido} onChange={handle} />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <BadgeOutlined color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>Identificación</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth required label="DNI" name="dni" value={form.dni} onChange={handle} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth required type="email" label="Email" name="email" value={form.email} onChange={handle} />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <MenuBookOutlined color="primary" />
                <Typography variant="subtitle1" fontWeight={600}>Materia</Typography>
              </Stack>
              <TextField fullWidth required select label="Seleccioná una materia" name="materia" value={form.materia} onChange={handle}>
                {materias.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </TextField>
            </Box>

            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button type="reset" variant="text">Limpiar</Button>
              <Button type="submit" variant="contained" startIcon={<SaveOutlined />}>Inscribir</Button>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlumnoForm;