import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Customer from "./Pages/Customer/Customer";
import Doctor from "./Pages/Doctor/Doctor";
import Animal from './Pages/Animal/Animal';
import Report from "./Pages/Report/Report";
import Vaccine from "./Pages/Vaccine/Vaccine";
import Appointment from "./Pages/Appointment/Appointment";
import Navbar from "./Components/Navbar/Navbar";
import AvailableDate from "./Pages/AvailableDate/AvailableDate";


function App() {
  

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element = {<Home/>} />
    <Route path="/customer" element = {<Customer/>} />
    <Route path="/doctor" element = {<Doctor/>} />
    <Route path="/available-date" element = {<AvailableDate/>} />
    <Route path="/animal" element = {<Animal/>} />
    <Route path="/appointment" element = {<Appointment/>} />
    <Route path="/report" element = {<Report/>} />
    <Route path="/vaccine" element = {<Vaccine/>} />
    </Routes>
    </>
  )
}

export default App
