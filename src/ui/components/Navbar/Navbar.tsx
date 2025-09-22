import React from 'react';
import { useRouter } from 'next/router';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container
} from '@mui/material';
import {
    Home as HomeIcon,
    Pets as PetsIcon,
    Assessment as ReportIcon
} from '@mui/icons-material';

const Navbar: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const isActivePath = (path: string) => {
        if (path === '/') {
            return router.pathname === '/';
        }
        return router.pathname.startsWith(path);
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'primary.main' }}>
            <Container maxWidth="xl">
                <Toolbar>
                    {/* Logo */}
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            fontWeight: 700,
                            cursor: 'pointer',
                            mr: 4
                        }}
                        onClick={() => handleNavigation('/')}
                    >
                        <PetsIcon sx={{ mr: 1 }} />
                        Pet Adoption
                    </Typography>

                    {/* Navigation */}
                    <Box sx={{ flexGrow: 1 }} />
                    
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            startIcon={<HomeIcon />}
                            color="inherit"
                            onClick={() => handleNavigation('/')}
                            sx={{ 
                                fontWeight: isActivePath('/') ? 600 : 400,
                                backgroundColor: isActivePath('/') ? 'rgba(255,255,255,0.1)' : 'transparent'
                            }}
                        >
                            Homepage
                        </Button>
                        
                        <Button
                            startIcon={<PetsIcon />}
                            color="inherit"
                            onClick={() => handleNavigation('/pets/adocoes')}
                            sx={{ 
                                fontWeight: isActivePath('/pets/adocoes') ? 600 : 400,
                                backgroundColor: isActivePath('/pets/adocoes') ? 'rgba(255,255,255,0.1)' : 'transparent'
                            }}
                        >
                            Adoções
                        </Button>
                        
                        <Button
                            startIcon={<ReportIcon />}
                            color="inherit"
                            onClick={() => handleNavigation('/pets/relatorio')}
                            sx={{ 
                                fontWeight: isActivePath('/pets/relatorio') ? 600 : 400,
                                backgroundColor: isActivePath('/pets/relatorio') ? 'rgba(255,255,255,0.1)' : 'transparent'
                            }}
                        >
                            Relatório
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;