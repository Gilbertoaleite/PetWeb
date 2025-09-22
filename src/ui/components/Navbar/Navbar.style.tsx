import { styled } from '@mui/material/styles';
import { AppBar, Button, Typography, IconButton, Box } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '& .MuiToolbar-root': {
        minHeight: '64px',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    }
}));

export const Logo = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '1.5rem',
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
    cursor: 'pointer',
    '& .logo-icon': {
        marginRight: theme.spacing(1),
        fontSize: '2rem'
    }
}));

export const NavButton = styled(Button)<{ isActive?: boolean }>(({ theme, isActive }) => ({
    color: theme.palette.primary.contrastText,
    fontWeight: isActive ? 600 : 400,
    textTransform: 'none',
    fontSize: '1rem',
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    margin: theme.spacing(0, 0.5),
    minWidth: '120px',
    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.1)',
        transform: 'translateY(-1px)',
        transition: 'all 0.2s ease'
    },
    '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1)
    }
}));

export const MobileMenuButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    display: 'none',
    [theme.breakpoints.down('md')]: {
        display: 'inline-flex'
    }
}));

export const DesktopNavBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));