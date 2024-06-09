import { useState, useEffect } from 'react';
import axios from "axios";
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
  },
});

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [update, setUpdate] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });
  const [updateCustomer, setUpdateCustomer] = useState({
    name: "",
    phone: "",
    mail: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers")
      .then((res) => setCustomer(res.data))
      .then(() => setUpdate(true));
  }, [update]);

  useEffect(() => {
    setFilteredCustomers(
      customer?.filter(cust => cust?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, customer]);

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNewCustomer = () => {
    axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/customers", newCustomer)
      .then(setUpdate(false))
      .then(() => setNewCustomer({
        name: "",
        phone: "",
        mail: "",
        address: "",
        city: "",
      }));
  };

  const handleDeleteCustomer = (e) => {
    const { id } = e.target;
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateCustomer = () => {
    const { id } = updateCustomer;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/customers/${id}`, updateCustomer)
      .then(() => setUpdate(false))
      .then(() => setUpdateCustomer({ name: "", phone: "", mail: "", address: "", city: "" }));
  };

  const handleUpdateCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCustomerBtn = (e) => {
    const index = e.target.id;
    setUpdateCustomer({ ...customer[index] });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
            Customer Management
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add Customer
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Name Surname"
                  name="name"
                  value={newCustomer.name}
                  onChange={handleNewCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleNewCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Email"
                  name="mail"
                  value={newCustomer.mail}
                  onChange={handleNewCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Address"
                  name="address"
                  value={newCustomer.address}
                  onChange={handleNewCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="City"
                  name="city"
                  value={newCustomer.city}
                  onChange={handleNewCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleAddNewCustomer}
                  fullWidth
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Update Customer
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Name Surname"
                  name="name"
                  value={updateCustomer.name}
                  onChange={handleUpdateCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  value={updateCustomer.phone}
                  onChange={handleUpdateCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Email"
                  name="mail"
                  value={updateCustomer.mail}
                  onChange={handleUpdateCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Address"
                  name="address"
                  value={updateCustomer.address}
                  onChange={handleUpdateCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="City"
                  name="city"
                  value={updateCustomer.city}
                  onChange={handleUpdateCustomerInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                 color="success"
                  onClick={handleUpdateCustomer}
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Search Customer
            </Typography>
            <TextField
              variant='outlined'
              label='Enter name...'
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (<InputAdornment position="end"><SearchIcon /></InputAdornment>),
              }}
            />
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name Surname</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers?.map((cust, index) => (
                  <TableRow key={index}>
                    <TableCell>{cust.name}</TableCell>
                    <TableCell>{cust.phone}</TableCell>
                    <TableCell>{cust.mail}</TableCell>
                    <TableCell>{cust.address}</TableCell>
                    <TableCell>{cust.city}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={handleDeleteCustomer} id={cust.id}>
                        DELETE
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleUpdateCustomerBtn} id={index} sx={{ ml: 1 }}>
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

export default Customer;
