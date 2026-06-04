import { Box, Typography, Button, Grid, Card, CardContent, Stack, Alert, Chip, Divider } from "@mui/material";
import { AppRegistration, Dashboard as DashboardIcon, DarkMode, School } from "@mui/icons-material";
import { Link } from "react-router-dom";

const features = [
  { icon: <AppRegistration fontSize="large" color="primary" />, title: "Inscripción rápida", desc: "Registrá alumnos en materias en pocos pasos." },
  { icon: <DashboardIcon fontSize="large" color="primary" />, title: "Dashboard claro", desc: "Visualizá métricas e información en un vistazo." },
  { icon: <DarkMode fontSize="large" color="primary" />, title: "Tema claro/oscuro", desc: "Cambiá el aspecto según tu preferencia." },
];

const Home = ({ alumno }) => (
  <Stack spacing={6}>
    <Box
      sx={{
        p: { xs: 4, md: 8 },
        borderRadius: 4,
        background: (t) =>
          t.palette.mode === "light"
            ? "linear-gradient(135deg,#1e88e5 0%,#42a5f5 60%,#80d8ff 100%)"
            : "linear-gradient(135deg,#0d47a1 0%,#1565c0 60%,#1976d2 100%)",
        color: "#fff",
      }}
    >
      <Stack spacing={3} maxWidth="md">
        <School sx={{ fontSize: 48 }} />
        <Typography variant="h3" fontWeight={800}>
          Inscripciones académicas, simples y modernas
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
          Gestioná la inscripción de alumnos a materias con una interfaz limpia, responsive y con soporte de tema oscuro.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button component={Link} to="/registro" variant="contained" color="secondary" size="large" startIcon={<AppRegistration />}>
            Comenzar inscripción
          </Button>
          <Button component={Link} to="/dashboard" variant="outlined" size="large" sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.6)" }} startIcon={<DashboardIcon />}>
            Ver dashboard
          </Button>
        </Stack>
      </Stack>
    </Box>

    {alumno ? (
      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>Resumen de inscripción</Typography>
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
      <Alert severity="info">Todavía no hay ninguna inscripción cargada.</Alert>
    )}

    <Grid container spacing={3}>
      {features.map((f) => (
        <Grid item xs={12} md={4} key={f.title}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={2}>
                {f.icon}
                <Typography variant="h6" fontWeight={700}>{f.title}</Typography>
                <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Stack>
);

export default Home;