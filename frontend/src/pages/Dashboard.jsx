import { Grid, Card, CardContent, Stack, Typography, Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Alert } from "@mui/material";
import { GroupsOutlined, MenuBookOutlined, AssignmentTurnedInOutlined, Person } from "@mui/icons-material";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsuario } from '../contexts/UsuarioContext';

const Dashboard = ({ alumno }) => {
  const navigate = useNavigate();
  const { usuario } = useUsuario();

  useEffect(() => {
    if (!usuario) navigate('/login');
  }, [usuario, navigate]);

  if (!usuario) return null;

  const stats = [
    { label: "Usuario", value: usuario.email, icon: <Person />, color: "primary.main" },
    { label: "Materias disponibles", value: 4, icon: <MenuBookOutlined />, color: "secondary.main" },
    { label: "Alumno inscripto", value: alumno ? alumno.nombre : "Ninguno", icon: <AssignmentTurnedInOutlined />, color: "success.main" },
    { label: "Materia elegida", value: alumno ? alumno.materia : "-", icon: <GroupsOutlined />, color: "warning.main" },
  ];

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h4" fontWeight={800}>Dashboard</Typography>
        <Typography variant="body1" color="text.secondary">Bienvenido, {usuario.nombre}</Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Card>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: s.color, width: 48, height: 48 }}>{s.icon}</Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                    <Typography variant="h6" fontWeight={700}>{s.value}</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {alumno ? (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Inscripción registrada</Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
              <ListItem>
                <ListItemAvatar><Avatar><Person /></Avatar></ListItemAvatar>
                <ListItemText
                  primary={alumno.nombre}
                  secondary={`DNI: ${alumno.dni} — Email: ${alumno.email} — Materia: ${alumno.materia} — Modalidad: ${alumno.modalidad} — Turno: ${alumno.turno}`}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="info">Todavía no hay ninguna inscripción registrada.</Alert>
      )}
    </Stack>
  );
};

export default Dashboard;