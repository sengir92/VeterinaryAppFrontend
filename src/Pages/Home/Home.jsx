import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    info: {
      main: '#00acc1',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ffa726',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '1rem',
          padding: '0.5rem 1rem',
        },
      },
    },
  },
});

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Container sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}>
          <Typography variant="h4" gutterBottom>
            Welcome to VetCare - Comprehensive Veterinary Management App
          </Typography>
          <Typography variant="h6" gutterBottom>
            Streamline your veterinary practice with ease
          </Typography>
          <Typography variant="body1" gutterBottom>
            VetCare is designed to help you efficiently manage your veterinary clinic. From customer and animal management to appointment scheduling and vaccine tracking, our app provides all the tools you need to provide exceptional care.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Use the navigation buttons below to access different sections of the app:
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '2rem' }}>
            <Grid item xs={12} sm={4} md={4}>
              <Button variant="contained" color="primary" component={Link} to="/customer" startIcon={<PeopleIcon />}>
                Manage Customers
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Button variant="contained" color="secondary" component={Link} to="/animal" startIcon={<PetsIcon />}>
                Manage Animals
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Button variant="contained" color="info" component={Link} to="/appointment" startIcon={<CalendarTodayIcon />}>
                Manage Appointments
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Button variant="contained" color="success" component={Link} to="/vaccine" startIcon={<VaccinesIcon />}>
                Manage Vaccines
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Button variant="contained" color="warning" component={Link} to="/doctor" startIcon={<LocalHospitalIcon />}>
                Manage Doctors
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
