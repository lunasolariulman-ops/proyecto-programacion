import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Tooltip,
} from "@mui/material";
import {
  School as SchoolIcon,
  Brightness4,
  Brightness7,
  Login as LoginIcon,
  Dashboard as DashboardIcon,
  AppRegistration,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useTema } from "../../contexts/TemaContext";

const links = [
  { to: "/", label: "Inicio", icon: <SchoolIcon fontSize="small" /> },
  { to: "/registro", label: "Inscripción", icon: <AppRegistration fontSize="small" /> },
  { to: "/dashboard", label: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
  { to: "/login", label: "Login", icon: <LoginIcon fontSize="small" /> },
];

const Navbar = () => {
  const { modo, toggleTema } = useTema();
  const { pathname } = useLocation();

  return (
    <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <SchoolIcon color="primary" />
          <Typography variant="h6" component={Link} to="/" sx={{ color: "text.primary", textDecoration: "none", fontWeight: 700, flexGrow: 1 }}>
            EduInscribe
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {links.map((l) => (
              <Button
                key={l.to}
                component={Link}
                to={l.to}
                startIcon={l.icon}
                color={pathname === l.to ? "primary" : "inherit"}
                variant={pathname === l.to ? "contained" : "text"}
                disableElevation
              >
                {l.label}
              </Button>
            ))}
          </Box>

          <Tooltip title={modo === "light" ? "Modo oscuro" : "Modo claro"}>
            <IconButton onClick={toggleTema} color="inherit">
              {modo === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;