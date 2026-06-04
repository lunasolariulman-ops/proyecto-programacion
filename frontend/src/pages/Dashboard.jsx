import { Grid, Card, CardContent, Stack, Typography, Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { GroupsOutlined, MenuBookOutlined, AssignmentTurnedInOutlined, PersonOutline } from "@mui/icons-material";
import { useUsuario } from "../contexts/UsuarioContext";

const materias = ["Matemática", "Programación", "Historia", "Inglés"];

const Dashboard = ({ alumno }) => {
  const { usuario } = useUsuario();

  const stats = [
    { label: "Usuario", value: usuario?.email ?? "Invitado", icon: <PersonOutline />, color: "primary.main" },
    { label: "Materias disponibles", value: materias.length, icon: <MenuBookOutlined />, color: "secondary.main" },
    { label: "Alumno inscripto", value: alumno ? `${alumno.nombre} ${alumno.apellido}` : "Ninguno", icon: <AssignmentTurnedInOutlined />, color: "success.main" },
    { label: "Materia elegida", value: alumno?.materia ?? "-", icon: <GroupsOutlined />, color: "warning.main" },
  ];

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h4" fontWeight={800}>Dashboard</Typography>
        <Typography variant="body1" color="text.secondary">Resumen general de inscripciones</Typography>
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

      {alumno && (
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>Inscripción registrada</Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
              <ListItem>
                <ListItemAvatar><Avatar><PersonOutline /></Avatar></ListItemAvatar>
                <ListItemText
                  primary={`${alumno.nombre} ${alumno.apellido}`}
                  secondary={`DNI: ${alumno.dni} — Email: ${alumno.email} — Materia: ${alumno.materia}`}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default Dashboard;