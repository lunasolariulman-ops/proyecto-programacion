import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import { useTema } from '../../contexts/TemaContext';

function Layout({ children }) {
    const { tema } = useTema();

    const estilos = {
        minHeight: '100vh',
        backgroundColor: tema === 'claro' ? '#f5f5f5' : '#121212',
        color: tema === 'claro' ? '#000000' : '#ffffff',
        transition: 'all 0.3s ease',
    };
    return (
        <Box sx={estilos}>
            <Navbar />  

            <Container maxWidth="md" sx={{ mt: 4 }}>
                {children}
            </Container>
        </Box>
    );
}

export default Layout;