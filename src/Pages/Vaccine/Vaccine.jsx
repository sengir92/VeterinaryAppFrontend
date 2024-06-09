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

function Vaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [update, setUpdate] = useState(false);
  const [animal, setAnimal] = useState([]);
  const [report, setReport] = useState([]);
  const [newVaccine, setNewVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "", 
    protectionFinishDate: "",
    animalWithoutCustomer: {},
    reportId: "", 
  });
  const [updateVaccine, setUpdateVaccine] = useState({
    name: "",
    code: "",
    protectionStartDate: "", 
    protectionFinishDate: "",
    animalWithoutCustomer: {},
    reportId: "", 
  });

  const [filterAnimalName, setFilterAnimalName] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/vaccines")
      .then((res) => setVaccine(res.data));
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals")
      .then((res) => setAnimal(res.data));
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/reports")
      .then((res) => setReport(res.data));
  }, [update]);

  const handleNewVaccineInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccine(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnimalWithoutCustomerSelectChange = (e) => {
    const id = e.target.value;
    const selectedAnimal = animal.find((a) => a.id === +id);
    const name = e.target.name === 'new' ? 'newVaccine' : 'updateVaccine';
    if(name === 'newVaccine') {
      setNewVaccine(prev => ({
        ...prev,
        animalWithoutCustomer: selectedAnimal,
      }));
    } else {
      setUpdateVaccine(prev => ({
        ...prev,
        animalWithoutCustomer: selectedAnimal,
      }));
    }
  };

  const handleReportSelectChange = (e) => {
    const id = e.target.value;
    const name = e.target.name === 'new' ? 'newVaccine' : 'updateVaccine';
    if(name === 'newVaccine') {
      setNewVaccine(prev => ({
        ...prev,
        reportId: id,
      }));
    } else {
      setUpdateVaccine(prev => ({
        ...prev,
        reportId: id,
      }));
    }
  };

  const handleAddNewVaccine = () => {
    axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/vaccines", newVaccine)
      .then(() => setUpdate(!update))
      .then(() => setNewVaccine({
        name: "",
        code: "",
        protectionStartDate: "", 
        protectionFinishDate: "",
        animalWithoutCustomer: {},
        reportId: "", 
      }));
  };

  const handleDeleteVaccine = (e) => {
    const { id } = e.target;
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccines/${id}`)
      .then(() => setUpdate(!update));
  };

  const handleUpdateVaccine = () => {
    const { id } = updateVaccine;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/vaccines/${id}`, updateVaccine)
      .then(() => setUpdate(!update))
      .then(() => setUpdateVaccine({
        name: "", 
        code: "", 
        protectionStartDate: "", 
        protectionFinishDate: "", 
        animalWithoutCustomer: {}, 
        reportId: "", 
      }));
  };

  const handleUpdateVaccineInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateVaccine(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateVaccineBtn = (e) => {
    const index = e.target.id;
    setUpdateVaccine({ ...vaccine[index], animalWithoutCustomer: vaccine[index].animal, reportId: vaccine[index].reportId });
  };

  const filteredVaccines = vaccine.filter(vac => {
    const animalNameMatches = vac.animal.name.toLowerCase().includes(filterAnimalName.toLowerCase());
    const startDateMatches = !filterStartDate || new Date(vac.protectionStartDate) >= new Date(filterStartDate);
    const endDateMatches = !filterEndDate || new Date(vac.protectionFinishDate) <= new Date(filterEndDate);
    return animalNameMatches && startDateMatches && endDateMatches;
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
            Vaccine Management
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add New Vaccine
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Name"
                  name="name"
                  value={newVaccine.name}
                  onChange={handleNewVaccineInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Code"
                  name="code"
                  value={newVaccine.code}
                  onChange={handleNewVaccineInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Protection Start Date"
                  name="protectionStartDate"
                  value={newVaccine.protectionStartDate}
                  onChange={handleNewVaccineInputChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Protection Finish Date"
                  name="protectionFinishDate"
                  value={newVaccine.protectionFinishDate}
                  onChange={handleNewVaccineInputChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Animal"
                  id="AnimalSelect"
                  value={newVaccine.animalWithoutCustomer.id || ""}
                  onChange={handleAnimalWithoutCustomerSelectChange}
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
                  labelId="Report"
                  id="ReportSelect"
                  value={newVaccine.reportId || ""}
                  onChange={handleReportSelectChange}
                  name="new"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Report</MenuItem>
                  {report.map((rep, index) => (
                    <MenuItem key={index} value={rep.id}>
                      {rep.reportType}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              onClick={handleAddNewVaccine}
            >
              Add New Vaccine
            </Button>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Update Vaccine
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Name"
                  name="name"
                  value={updateVaccine.name}
                  onChange={handleUpdateVaccineInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Code"
                  name="code"
                  value={updateVaccine.code}
                  onChange={handleUpdateVaccineInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Protection Start Date"
                  name="protectionStartDate"
                  value={updateVaccine.protectionStartDate}
                  onChange={handleUpdateVaccineInputChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Protection Finish Date"
                  name="protectionFinishDate"
                  value={updateVaccine.protectionFinishDate}
                  onChange={handleUpdateVaccineInputChange}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Animal"
                  id="AnimalSelect"
                  value={updateVaccine.animalWithoutCustomer.id || ""}
                  onChange={handleAnimalWithoutCustomerSelectChange}
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
                  labelId="Report"
                  id="ReportSelect"
                  value={updateVaccine.reportId || ""}
                  onChange={handleReportSelectChange}
                  name="update"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Report</MenuItem>
                  {report.map((rep, index) => (
                    <MenuItem key={index} value={rep.id}>
                      {rep.reportType}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="success"
              onClick={handleUpdateVaccine}
            >
              Update Vaccine
            </Button>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Vaccine List
            </Typography>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="text"
                  label="Filter by Animal Name"
                  value={filterAnimalName}
                  onChange={(e) => setFilterAnimalName(e.target.value)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Filter by Start Date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Filter by End Date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Protection Start Date</TableCell>
                    <TableCell>Protection Finish Date</TableCell>
                    <TableCell>Animal</TableCell>
                    <TableCell>Report</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredVaccines.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.protectionStartDate}</TableCell>
                      <TableCell>{row.protectionFinishDate}</TableCell>
                      <TableCell>{row.animal.name}</TableCell>
                      <TableCell>{row.reportId}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" size="small" id={index} onClick={handleUpdateVaccineBtn}>
                          Update
                        </Button>
                        <Button variant="contained" color="secondary" size="small" id={row.id} onClick={handleDeleteVaccine} sx={{ ml: 1 }}>
                          Delete
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

export default Vaccine;
