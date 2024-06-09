Open your browser and navigate to https://veterinary-app-frontend.vercel.app/.
You will be presented with the login page.
From the navigation menu, access the following sections to perform CRUD operations:
Customer Management
Register new customers.
View, update, and delete customer information.
Filter customers by name.
Animal Management
Register new animals under a customer.
View, update, and delete animal information.
Filter animals by name and owner's name.
Doctor Management
Register new veterinary doctors.
View, update, and delete doctor information.
Manage doctors' available days.
Appointment Management
Schedule appointments for animals with doctors.
View, update, and delete appointment information.
Ensure doctor availability before scheduling.
Filter appointments by date range, animal, and doctor.
Vaccination Management
Record vaccinations for animals.
View, update, and delete vaccination information.
Prevent duplicate vaccinations within the protection period.
Filter vaccinations by protection end date.
Reports
Generate reports for animals with scheduled vaccinations.
API Endpoints
Customers
GET /customers: Retrieve all customers
POST /customers: Create a new customer
PUT /customers/:id: Update a customer
DELETE /customers/:id: Delete a customer
GET /customers?name=<name>: Filter customers by name
Animals
GET /animals: Retrieve all animals
POST /animals: Create a new animal
PUT /animals/:id: Update an animal
DELETE /animals/:id: Delete an animal
GET /animals?name=<name>&ownerName=<ownerName>: Filter animals by name and owner's name
Doctors
GET /doctors: Retrieve all doctors
POST /doctors: Create a new doctor
PUT /doctors/:id: Update a doctor
DELETE /doctors/:id: Delete a doctor
Vaccinations
GET /vaccinations: Retrieve all vaccinations
POST /vaccinations: Record a new vaccination
PUT /vaccinations/:id: Update a vaccination
DELETE /vaccinations/:id: Delete a vaccination
GET /vaccinations?start=<startDate>&end=<endDate>: Filter vaccinations by date range
Appointments
GET /appointments: Retrieve all appointments
POST /appointments: Create a new appointment
PUT /appointments/:id: Update an appointment
DELETE /appointments/:id: Delete an appointment
GET /appointments?start=<startDate>&end=<endDate>: Filter appointments by date range
Contributing
Fork the repository.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
License
Distributed under the MIT License. See LICENSE for more information.

Contact
For any inquiries or feedback, feel free to contact the project maintainers.
