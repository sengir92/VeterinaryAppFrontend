import { useState, useEffect } from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: '#4caf50',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
          minWidth: '250px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: '1rem',
          padding: '0.5rem 1rem',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
          minWidth: '250px',
        },
      },
    },
  },
});

function AvailableDate() {
  const [availableDate, setAvailableDate] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: "",
    doctor: {},
  });
  const [updateAvailableDate, setUpdateAvailableDate] = useState({
    availableDate: "",
    doctor: {},
  });

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/available-dates")
      .then((res) => setAvailableDate(res.data))
      .then(() => setUpdate(true));
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewAvailableDateInputChange = (e) => {
    const { name, value } = e.target;
    setNewAvailableDate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDoctorSelectChange = (e) => {
    const id = e.target.value;
    if (e.target.name === 'new') {
      const newDoctor = doctor.find((a) => a.id === +id);
      setNewAvailableDate((prev) => ({
        ...prev,
        doctor: newDoctor,
      }));
    }
    if (e.target.name === 'update') {
      const updateDoctor = doctor.find((a) => a.id === +id);
      setUpdateAvailableDate((prev) => ({
        ...prev,
        doctor: updateDoctor,
      }));
    }
  };

  const handleAddNewAvailableDate = () => {
    axios
      .post(import.meta.env.VITE_APP_BASEURL + "/api/v1/available-dates", newAvailableDate)
      .then(setUpdate(false))
      .then(() => setNewAvailableDate({
        availableDate: "",
        doctor: {},
      }));
  };

  const handleDeleteAvailableDate = (e) => {
    const { id } = e.target;
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateAvailableDate = (e) => {
    const { id } = updateAvailableDate;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/available-dates/${id}`, updateAvailableDate)
      .then(() => setUpdate(false))
      .then(() => setUpdateAvailableDate({ availableDate: "", doctor: {} }));
  };

  const handleUpdateAvailableDateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAvailableDate((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateAvailableDateBtn = (e) => {
    const index = e.target.id;
    setUpdateAvailableDate({ ...availableDate[index] });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        padding: '2rem',
      }}>
        <Container sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}>
          <Typography variant="h4" gutterBottom align="center">
            Available Dates Management
          </Typography>

          <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add Available Date
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                label="Available Date"
                name="availableDate"
                type="date"
                value={newAvailableDate.availableDate}
                onChange={handleNewAvailableDateInputChange}
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                labelId="Doctor"
                id="DoctorSelect"
                value={newAvailableDate.doctor.id || ""}
                onChange={handleDoctorSelectChange}
                name="new"
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>Select Doctor</MenuItem>
                {doctor?.map((doc, index) => (
                  <MenuItem key={index} value={doc?.id}>
                    {doc?.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleAddNewAvailableDate}
                fullWidth
              >
                Add New Available Date
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Update Available Date
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                label="Available Date"
                name="availableDate"
                type="date"
                value={updateAvailableDate.availableDate}
                onChange={handleUpdateAvailableDateInputChange}
                size="small"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                labelId="Doctor"
                id="DoctorSelect"
                value={updateAvailableDate.doctor.id || ""}
                onChange={handleDoctorSelectChange}
                name="update"
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>Select Doctor</MenuItem>
                {doctor?.map((doc, index) => (
                  <MenuItem key={index} value={doc?.id}>
                    {doc?.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                color="success"
                onClick={handleUpdateAvailableDate}
                fullWidth
              >
                Update Available Date
              </Button>
            </Grid>
          </Grid>
        </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Available Date</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availableDate?.map((avi, index) => (
                  <TableRow key={index}>
                    <TableCell>{avi?.availableDate}</TableCell>
                    <TableCell>{avi?.doctor.name}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={handleDeleteAvailableDate} id={avi?.id}>
                        DELETE
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleUpdateAvailableDateBtn} id={index} sx={{ ml: 1 }}>
                        UPDATE
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default AvailableDate;
