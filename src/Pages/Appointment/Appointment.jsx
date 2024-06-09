import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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

function Appointment() {
  const [appointment, setAppointment] = useState([]);
  const [update, setUpdate] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    doctor: {},
    animal: {},
  });
  const [updateAppointment, setUpdateAppointment] = useState({
    date: "",
    doctor: {},
    animal: {},
  });
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterAnimal, setFilterAnimal] = useState("");
  const [filterDateRange, setFilterDateRange] = useState({
    start: "",
    end: ""
  });

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/appointments")
      .then((res) => setAppointment(res.data))
      .then(() => setUpdate(true));

    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals")
      .then((res) => setAnimal(res.data))
      .then(() => setUpdate(true));

    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnimalSelectChange = (e) => {
    const id = e.target.value;
    const selectedAnimal = animal.find((a) => a.id === +id);
    const isUpdate = e.target.name === 'update';
    if (isUpdate) {
      setUpdateAppointment(prev => ({ ...prev, animal: selectedAnimal }));
    } else {
      setNewAppointment(prev => ({ ...prev, animal: selectedAnimal }));
    }
  };

  const handleDoctorSelectChange = (e) => {
    const id = e.target.value;
    const selectedDoctor = doctor.find((a) => a.id === +id);
    const isUpdate = e.target.name === 'update';
    if (isUpdate) {
      setUpdateAppointment(prev => ({ ...prev, doctor: selectedDoctor }));
    } else {
      setNewAppointment(prev => ({ ...prev, doctor: selectedDoctor }));
    }
  };

  const handleAddNewAppointment = () => {
    axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/appointments", newAppointment)
      .then(() => setUpdate(false))
      .then(() => setNewAppointment({ date: "", animal: {}, doctor: {} }));
  };

  const handleDeleteAppointment = (e) => {
    const { id } = e.target;
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateAppointment = () => {
    const { id } = updateAppointment;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/appointments/${id}`, updateAppointment)
      .then(() => setUpdate(false))
      .then(() => setUpdateAppointment({ date: "", animal: {}, doctor: {} }));
  };

  const handleUpdateAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateAppointmentBtn = (e) => {
    const index = e.target.id;
    setUpdateAppointment({ ...appointment[index] });
  };

  const handleFilterDoctorChange = (e) => {
    setFilterDoctor(e.target.value);
  };

  const handleFilterAnimalChange = (e) => {
    setFilterAnimal(e.target.value);
  };

  const handleFilterDateRangeChange = (e) => {
    const { name, value } = e.target;
    setFilterDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredAppointments = appointment.filter((app) => {
    const isDoctorMatch = filterDoctor ? app.doctor.id === +filterDoctor : true;
    const isAnimalMatch = filterAnimal ? app.animal.id === +filterAnimal : true;
    const isDateInRange = filterDateRange.start && filterDateRange.end ?
      new Date(app.date) >= new Date(filterDateRange.start) && new Date(filterDateRange.end) >= new Date(app.date) : true;
    return isDoctorMatch && isAnimalMatch && isDateInRange;
  });

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
            Appointment Management
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add New Appointment
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="datetime-local"
                  label="Date"
                  name="date"
                  value={newAppointment.date}
                  onChange={handleNewAppointmentInputChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Animal"
                  id="AnimalSelect"
                  value={newAppointment.animal.id || ""}
                  onChange={handleAnimalSelectChange}
                  name="new"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Animal</MenuItem>
                  {animal.map((ani, index) => (
                    <MenuItem key={index} value={ani.id}>
                      {ani.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Doctor"
                  id="DoctorSelect"
                  value={newAppointment.doctor.id || ""}
                  onChange={handleDoctorSelectChange}
                  name="new"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Doctor</MenuItem>
                  {doctor.map((doc, index) => (
                    <MenuItem key={index} value={doc.id}>
                      {doc.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleAddNewAppointment}
                  fullWidth
                >
                  Add New Appointment
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Update Appointment
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="datetime-local"
                  label="Date"
                  name="date"
                  value={updateAppointment.date}
                  onChange={handleUpdateAppointmentInputChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Animal"
                  id="AnimalSelect"
                  value={updateAppointment.animal.id || ""}
                  onChange={handleAnimalSelectChange}
                  name="update"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Animal</MenuItem>
                  {animal.map((ani, index) => (
                    <MenuItem key={index} value={ani.id}>
                      {ani.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Doctor"
                  id="DoctorSelect"
                  value={updateAppointment.doctor.id || ""}
                  onChange={handleDoctorSelectChange}
                  name="update"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Doctor</MenuItem>
                  {doctor.map((doc, index) => (
                    <MenuItem key={index} value={doc.id}>
                      {doc.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpdateAppointment}
                  fullWidth
                >
                  Update Appointment
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Filter Appointments
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Select
                  labelId="FilterDoctor"
                  id="FilterDoctorSelect"
                  value={filterDoctor}
                  onChange={handleFilterDoctorChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="">All Doctors</MenuItem>
                  {doctor.map((doc, index) => (
                    <MenuItem key={index} value={doc.id}>
                      {doc.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="FilterAnimal"
                  id="FilterAnimalSelect"
                  value={filterAnimal}
                  onChange={handleFilterAnimalChange}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="">All Animals</MenuItem>
                  {animal.map((ani, index) => (
                    <MenuItem key={index} value={ani.id}>
                      {ani.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Start Date"
                  name="start"
                  value={filterDateRange.start}
                  onChange={handleFilterDateRangeChange}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="End Date"
                  name="end"
                  value={filterDateRange.end}
                  onChange={handleFilterDateRangeChange}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Appointment List
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Animal</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAppointments.map((app, index) => (
                    <TableRow key={index}>
                      <TableCell>{app.date}</TableCell>
                      <TableCell>{app.animal.name}</TableCell>
                      <TableCell>{app.doctor.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          id={app.id}
                          onClick={handleDeleteAppointment}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          id={index}
                          onClick={handleUpdateAppointmentBtn}
                          sx={{ ml: 1 }}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Appointment;


