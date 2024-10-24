const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS package
require("dotenv").config();
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Create a connection to the database
// MongoDB connection string
const queryString =
  process.env.MONGODB_URI ||
  "mongodb+srv://dobalam:dobalam-it4409@lamdb-it4409.ybiwz.mongodb.net/College?retryWrites=true&w=majority&appName=lamdb-it4409";

// Connect to MongoDB using Mongoose
mongoose
  .connect(queryString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

// Define a schema and model for Students
const studentSchema = new mongoose.Schema({
  StudentId: { type: Number, required: true },
  Name: { type: String, required: true },
  Roll: { type: Number, required: true },
  Birthday: { type: Date, required: true },
  Address: { type: String },
});

const Student = mongoose.model("Student", studentSchema);

// Create a new student
app.post("/students", (req, res) => {
  const { StudentId, Name, Roll, Birthday, Address } = req.body;

  // Ensure StudentId is unique
  Student.findOne({ StudentId })
    .then((existingStudent) => {
      if (existingStudent) {
        return res.status(400).send("Student with this ID already exists.");
      }

      const newStudent = new Student({
        StudentId,
        Name,
        Roll,
        Birthday,
        Address,
      });

      newStudent
        .save()
        .then(() => res.send("New student has been added"))
        .catch((err) => {
          console.error("Error inserting data:", err);
          res.status(500).send("Error inserting data");
        });
    })
    .catch((err) => {
      console.error("Error checking StudentId:", err);
      res.status(500).send("Error checking StudentId");
    });
});

// Get all students
app.get("/students", (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    });
});

// Get a single student by StudentId
app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  Student.findOne({ StudentId: id })
    .then((student) => res.json(student || {}))
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    });
});

// Delete a student by StudentId
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  Student.findOneAndDelete({ StudentId: id })
    .then(() => res.send("Data has been deleted"))
    .catch((err) => {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    });
});

// Update a student
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { Name, Roll, Birthday, Address } = req.body;

  // Construct the update object only for provided fields
  const update = {};
  if (Name) update.Name = Name;
  if (Roll) update.Roll = Roll;
  if (Birthday) update.Birthday = Birthday;
  if (Address) update.Address = Address;

  Student.findOneAndUpdate({ StudentId: id }, update, { new: true })
    .then((student) => res.json(student))
    .catch((err) => {
      console.error("Error updating data:", err);
      res.status(500).send("Error updating data");
    });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Application listening on port ${PORT}`));
