// import { useState ,useEffect} from "react"
// import axios from "axios";
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';


// function Doctor() {
//   const [doctor,setDoctor] = useState();
//   const [update,setUpdate] = useState(false);
//   const [newDoctor,setNewDoctor] = useState ({
//     name:"",
//     phone: "",
//     email: "",
//     address: "",
//     city: "",
//   }); 
//   const [updateDoctor, setUpdateDoctor] = useState({
//     name:"",
//     phone: "",
//     email: "",
//     address: "",
//     city: "",
//   });

//   useEffect(() => {
//     axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors")
//     .then((res) => setDoctor(res.data))
//     .then(() =>setUpdate(true));
//   }, [update]);

//   const handleNewDoctorInputChange = (e) => {
//     const {name, value} = e.target;
//     setNewDoctor(prev => ({
//       ...prev,
//       [name]:value
//     }))
//   };

//   const handleAddNewDoctor = () => {
//     axios
//     .post(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors", newDoctor)
//     .then(setUpdate(false))
//     .then(
//       setNewDoctor({
//         name: "",
//         phone: "",
//         email: "",
//         address: "",
//         city: "",
//       })
//     );
//   };

//   const handleDeleteDoctor = (e) => {
//     const {id} = e.target;
//     axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors/${id}`)
//     .then(() => setUpdate(false));
//   };

//   const handleUpdateDoctor = () => {
//     const {id} = updateDoctor;
//     axios
//     .put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors/${id}`, updateDoctor)
//     .then(() => setUpdate(false))
//     .then(() => setUpdateDoctor({ name: "", phone: "", email: "", address: "", city: ""}));
//   };

//   const handleUpdateDoctorInputChange = (e) => {
//     const {name, value} = e.target;
//     setUpdateDoctor((prev) => ({
//       ...prev,
//       [name] : value,
//     }));
//   }

//   const handleUpdateDoctorBtn = (e) => {
//     const index = e.target.id;
//     setUpdateDoctor({...doctor[index]})
//   }

//   return (
//     <div>
//       <div>
//         <h3>Add New Doctor</h3>
//         <TextField variant="standard" type="text" placeholder="Name" name="name" value={newDoctor.name} onChange={handleNewDoctorInputChange} />
//         <br />
//         <TextField variant="standard" type="text" placeholder="Phone" name="phone" value={newDoctor.phone} onChange={handleNewDoctorInputChange} />
//         <br />
//         <TextField variant="standard" type="text" placeholder="Email" name="email" value={newDoctor.email} onChange={handleNewDoctorInputChange} />
//         <br />
//         <TextField variant="standard" type="text" placeholder="Address" name="address" value={newDoctor.address} onChange={handleNewDoctorInputChange}/>
//         <br />
//         <TextField variant="standard" type="text" placeholder="City" name="city" value={newDoctor.city} onChange={handleNewDoctorInputChange} />
//         <br />
//         <br />

//         <Button variant="contained" endIcon = {<SendIcon/>} onClick={handleAddNewDoctor}>Add New Doctor</Button>
//       </div>
//       <br />
//       <div>
//         <h3>Update Doctor</h3>
//         <TextField variant="standard" type="text" placeholder="Name" name="name" value={updateDoctor.name} onChange={handleUpdateDoctorInputChange} />
//         <br />
//         <TextField variant="standard" type="text" placeholder="Phone" name="phone" value={updateDoctor.phone} onChange={handleUpdateDoctorInputChange} />
//         <br />
//         <TextField variant="standard" type="text" placeholder="Email" name="email" value={updateDoctor.email} onChange={handleUpdateDoctorInputChange} />
//         <br />
//         <TextField variant="standard" type="text" placeholder="Address" name="address" value={updateDoctor.address} onChange={handleUpdateDoctorInputChange}/>
//         <br />
//         <TextField variant="standard" type="text" placeholder="City" name="city" value={updateDoctor.city} onChange={handleUpdateDoctorInputChange} />
//         <br />
//         <br />
//         <Button variant="contained" color="success" onClick={handleUpdateDoctor}>Update Doctor</Button>
//         <br />
//         <br />
//         <hr />
//       </div>
//       <p>
//       {" "}
//       {newDoctor.name} - {newDoctor.phone} -{newDoctor.email} - {newDoctor.address} - {newDoctor.city}
//     </p>
//       <hr />
//       <ul>
//         {doctor?.map((doc,index) =>(
//       <li key={index}>
//           {doc.name} -
//           {doc.phone} -
//           {doc.email} - 
//           {doc.address} -
//           {doc.city} - 
//           <span onClick={handleDeleteDoctor} id={doc.id}>
//             {" "}
//             DELETE
//             {" "}
//             </span> - {" "}
//             <span onClick={handleUpdateDoctorBtn}  id={index}>
//             UPDATE
//             </span>
//         </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Doctor;

import { useState, useEffect } from 'react';
import axios from "axios";
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
  },
});

function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });
  const [updateDoctor, setUpdateDoctor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNewDoctor = () => {
    axios.post(import.meta.env.VITE_APP_BASEURL + "/api/v1/doctors", newDoctor)
      .then(setUpdate(false))
      .then(() => setNewDoctor({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
      }));
  };

  const handleDeleteDoctor = (e) => {
    const { id } = e.target;
    axios.delete(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors/${id}`)
      .then(() => setUpdate(false));
  };

  const handleUpdateDoctor = () => {
    const { id } = updateDoctor;
    axios.put(`${import.meta.env.VITE_APP_BASEURL}/api/v1/doctors/${id}`, updateDoctor)
      .then(() => setUpdate(false))
      .then(() => setUpdateDoctor({ name: "", phone: "", email: "", address: "", city: "" }));
  };

  const handleUpdateDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDoctorBtn = (e) => {
    const index = e.target.id;
    setUpdateDoctor({ ...doctor[index] });
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
            Doctor Management
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add Doctor
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={newDoctor.name}
                  onChange={handleNewDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  value={newDoctor.phone}
                  onChange={handleNewDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={newDoctor.email}
                  onChange={handleNewDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Address"
                  name="address"
                  value={newDoctor.address}
                  onChange={handleNewDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="City"
                  name="city"
                  value={newDoctor.city}
                  onChange={handleNewDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleAddNewDoctor}
                  fullWidth
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Update Doctor
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={updateDoctor.name}
                  onChange={handleUpdateDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  value={updateDoctor.phone}
                  onChange={handleUpdateDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={updateDoctor.email}
                  onChange={handleUpdateDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="Address"
                  name="address"
                  value={updateDoctor.address}
                  onChange={handleUpdateDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="outlined"
                  label="City"
                  name="city"
                  value={updateDoctor.city}
                  onChange={handleUpdateDoctorInputChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpdateDoctor}
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctor?.map((doc, index) => (
                  <TableRow key={index}>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.phone}</TableCell>
                    <TableCell>{doc.email}</TableCell>
                    <TableCell>{doc.address}</TableCell>
                    <TableCell>{doc.city}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={handleDeleteDoctor} id={doc.id}>
                        DELETE
                      </Button>
                      <Button variant="contained" color="primary" onClick={handleUpdateDoctorBtn} id={index} sx={{ ml: 1 }}>
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

export default Doctor;
