import { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
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

function Animal() {
  const [animal, setAnimal] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [update, setUpdate] = useState(false);
  const [animalSearchTerm, setAnimalSearchTerm] = useState('');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    colour: "",
    customer: {},
  });
  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    colour: "",
    customer: {},
  });

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals")
      .then((res) => setAnimal(res.data))
      .then(() => setUpdate(true));
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers")
      .then((res) => setCustomer(res.data))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewAnimalInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomerSelectChange = (e) => {
    const id = e.target.value;
    if (e.target.name === 'new') {
      const newCustomer = customer.find((a) => a.id === +id);
      setNewAnimal((prev) => ({
        ...prev,
        customer: newCustomer,
      }));
    }
    if (e.target.name === 'update') {
      const updateCustomer = customer.find((a) => a.id === +id);
      setUpdateAnimal((prev) => ({
        ...prev,
        customer: updateCustomer,
      }));
    }
  };

  const handleAddNewAnimal = () => {
    axios
      .post(import.meta.env.VITE_APP_BASEURL + "/api/v1/animals", newAnimal)
      .then(() => setUpdate(false))
      .then(
        setNewAnimal({
          name: "",
          species: "",
          breed: "",
          gender: "",
          dateOfBirth: "",
          colour: "",
          customer: {},
        })
      );
  };

  const handleDeleteAnimal = (e) => {
    const { id } = e.target;
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateAnimal = () => {
    const { id } = updateAnimal;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/animals/${id}`, updateAnimal)
      .then(() => setUpdate(false))
      .then(() => setUpdateAnimal({ name: "", species: "", breed: "", gender: "", dateOfBirth: "", colour: "", customer: {} }));
  };

  const handleUpdateAnimalInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAnimal((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateAnimalBtn = (e) => {
    const index = e.target.id;
    setUpdateAnimal({ ...animal[index] });
  };

  const handleAnimalSearchChange = (e) => {
    setAnimalSearchTerm(e.target.value);
  };

  const handleCustomerSearchChange = (e) => {
    setCustomerSearchTerm(e.target.value);
  };

  const filteredAnimals = animal?.filter(ani =>
    ani?.name.toLowerCase().includes(animalSearchTerm.toLowerCase()) &&
    ani?.customer?.name.toLowerCase().includes(customerSearchTerm.toLowerCase())
  );

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
            Animal Management
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add Animal
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={newAnimal.name}
                  onChange={handleNewAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Species"
                  name="species"
                  value={newAnimal.species}
                  onChange={handleNewAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Breed"
                  name="breed"
                  value={newAnimal.breed}
                  onChange={handleNewAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Gender"
                  name="gender"
                  value={newAnimal.gender}
                  onChange={handleNewAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={newAnimal.dateOfBirth}
                  onChange={handleNewAnimalInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Colour"
                  name="colour"
                  value={newAnimal.colour}
                  onChange={handleNewAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Customer"
                  id="CustomerSelect"
                  value={newAnimal.customer.id || ""}
                  onChange={handleCustomerSelectChange}
                  name="new"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Customer</MenuItem>
                  {customer?.map((cust, index) => (
                    <MenuItem key={index} value={cust.id}>
                      {cust.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleAddNewAnimal}
                  fullWidth
                >
                  Add New Animal
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Update Animal
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={updateAnimal.name}
                  onChange={handleUpdateAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Species"
                  name="species"
                  value={updateAnimal.species}
                  onChange={handleUpdateAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Breed"
                  name="breed"
                  value={updateAnimal.breed}
                  onChange={handleUpdateAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Gender"
                  name="gender"
                  value={updateAnimal.gender}
                  onChange={handleUpdateAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  type="date"
                  label="Date of Birth"
                  name="dateOfBirth"
                  value={updateAnimal.dateOfBirth}
                  onChange={handleUpdateAnimalInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Colour"
                  name="colour"
                  value={updateAnimal.colour}
                  onChange={handleUpdateAnimalInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  labelId="Customer"
                  id="CustomerSelect"
                  value={updateAnimal.customer.id || ""}
                  onChange={handleCustomerSelectChange}
                  name="update"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Select Customer</MenuItem>
                  {customer?.map((cust, index) => (
                    <MenuItem key={index} value={cust.id}>
                      {cust.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpdateAnimal}
                  fullWidth
                >
                  Update Animal
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Animal List
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  label="Search Animal"
                  value={animalSearchTerm}
                  onChange={handleAnimalSearchChange}
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  label="Search Customer"
                  value={customerSearchTerm}
                  onChange={handleCustomerSearchChange}
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Species</TableCell>
                    <TableCell>Breed</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>Colour</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAnimals?.map((ani, index) => (
                    <TableRow key={ani.id}>
                      <TableCell>{ani.name}</TableCell>
                      <TableCell>{ani.species}</TableCell>
                      <TableCell>{ani.breed}</TableCell>
                      <TableCell>{ani.gender}</TableCell>
                      <TableCell>{ani.dateOfBirth}</TableCell>
                      <TableCell>{ani.colour}</TableCell>
                      <TableCell>{ani.customer.name}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          id={ani.id}
                          onClick={handleDeleteAnimal}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          id={index}
                          onClick={handleUpdateAnimalBtn}
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

export default Animal;

