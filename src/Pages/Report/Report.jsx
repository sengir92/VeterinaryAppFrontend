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

function Report() {
  const [report, setReport] = useState([]);
  const [update, setUpdate] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [newReport, setNewReport] = useState({
    diagnosis: "",
    price: "",
    appointmentId: "",
  });
  const [updateReport, setUpdateReport] = useState({
    diagnosis: "",
    price: "",
    appointmentId: "",
  });

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/reports")
      .then((res) => setReport(res.data))
      .then(() => setUpdate(true));
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/appointments")
      .then((res) => setAppointment(res.data))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewReportInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAppointmentSelectChange = (e) => {
    const id = e.target.value;
    if (e.target.name === 'new') {
      setNewReport((prev) => ({
        ...prev,
        appointmentId: id,
      }));
    } else {
      setUpdateReport((prev) => ({
        ...prev,
        appointmentId: id,
      }));
    }
  };

  const handleAddNewReport = () => {
    axios
      .post(import.meta.env.VITE_APP_BASEURL + "/api/v1/reports", newReport)
      .then(() => setUpdate(false))
      .then(
        setNewReport({
          diagnosis: "",
          price: "",
          appointmentId: "",
        })
      );
  };

  const handleDeleteReport = (e) => {
    const { id } = e.target;
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateReport = () => {
    const { id } = updateReport;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/reports/${id}`, updateReport)
      .then(() => setUpdate(false))
      .then(() => setUpdateReport({ diagnosis: "", price: "", appointmentId: "" }));
  };

  const handleUpdateReportInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateReport((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateReportBtn = (e) => {
    const index = e.target.id;
    setUpdateReport({ ...report[index], appointmentId: report[index].appointmentForReportResponseDto.id });
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
            Report Management
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add New Report
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Diagnosis"
                  name="diagnosis"
                  value={newReport.diagnosis}
                  onChange={handleNewReportInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Price"
                  name="price"
                  type="number"
                  value={newReport.price}
                  onChange={handleNewReportInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Appointment"
                  id="AppointmentSelect"
                  value={newReport.appointmentId || ""}
                  onChange={handleAppointmentSelectChange}
                  name="new"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Appointment</MenuItem>
                  {appointment?.map((app, index) => (
                    <MenuItem key={index} value={app.id}>
                      {`DATE: ${app.date} -- ANIMAL: ${app.animal.name} -- DOCTOR: ${app.doctor.name}`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleAddNewReport}
                  fullWidth
                >
                  Add New Report
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Update Report
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Diagnosis"
                  name="diagnosis"
                  value={updateReport.diagnosis}
                  onChange={handleUpdateReportInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Price"
                  name="price"
                  type="number"
                  value={updateReport.price}
                  onChange={handleUpdateReportInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Appointment"
                  id="AppointmentSelect"
                  value={updateReport.appointmentId || ""}
                  onChange={handleAppointmentSelectChange}
                  name="update"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Appointment</MenuItem>
                  {appointment?.map((app, index) => (
                    <MenuItem key={index} value={app.id}>
                      {`DATE: ${app.date} -- ANIMAL: ${app.animal.name} -- DOCTOR: ${app.doctor.name}`}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpdateReport}
                  fullWidth
                >
                  Update Report
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Report List
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Diagnosis</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report?.map((rep, index) => (
                    <TableRow key={rep.id}>
                      <TableCell>{rep.diagnosis}</TableCell>
                      <TableCell>{rep.price}</TableCell>
                      <TableCell>{`DATE: ${rep.appointmentForReportResponseDto.date} -- ANIMAL: ${rep.animalForReportResponseDto.name}`}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          id={rep.id}
                          onClick={handleDeleteReport}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          id={index}
                          onClick={handleUpdateReportBtn}
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

export default Report;
