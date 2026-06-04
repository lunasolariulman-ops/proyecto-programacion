import { Grid, Card, CardContent, Stack, Typography, Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import {
  GroupsOutlined, MenuBookOutlined, AssignmentTurnedInOutlined, TrendingUp, PersonOutline,
} from "@mui/icons-material";

const stats = [
  { label: "Alumnos", value: 124, icon: <GroupsOutlined />, color: "primary.main" },
  { label: "Materias", value: 8, icon: <MenuBookOutlined />, color: "secondary.main" },
  { label: "Inscripciones", value: 312, icon: <AssignmentTurnedInOutlined />, color: "success.main" },
  { label: "Crecimiento", value: "+12%", icon: <TrendingUp />, color: "warning.main" },
];

const recientes = [
  { nombre: "Juan Pérez", materia: "Matemática" },
  { nombre: "Ana Gómez", materia: "Programación" },
  { nombre: "Luis Díaz", materia: "Inglés" },
];

const Dashboard = () => (
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
                  <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>Inscripciones recientes</Typography>
        <Divider sx={{ mb: 1 }} />
        <List>
          {recientes.map((r, i) => (
            <ListItem key={i} divider={i < recientes.length - 1}>
              <ListItemAvatar><Avatar><PersonOutline /></Avatar></ListItemAvatar>
              <ListItemText primary={r.nombre} secondary={`Materia: ${r.materia}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  </Stack>
);

export default Dashboard;