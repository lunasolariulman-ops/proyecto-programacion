import { Box, Container } from "@mui/material";
import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
    <Navbar />
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      {children}
    </Container>
  </Box>
);

export default Layout;

