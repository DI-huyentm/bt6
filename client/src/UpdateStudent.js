import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";

export default function UpdateStudent() {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    StudentId: "",
    Name: "",
    Roll: "",
    Birthday: "",
    Address: "",
  });

  useEffect(() => {
    // Fetch the current student data by ID and populate the form
    axios
      .get(`http://localhost:8080/students/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send PUT request to the backend to update the student
    axios
      .put(`http://localhost:8080/students/${id}`, formData)
      .then((response) => {
        console.log("Student updated:", response.data);
        // Redirect to student list after updating
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <TextField
        label="Student ID"
        name="StudentId"
        value={formData.StudentId}
        onChange={handleChange}
        required
        margin="normal"
        disabled // Disable editing Student ID
      />
      <TextField
        label="Name"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        label="Roll"
        name="Roll"
        value={formData.Roll}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        label="Birthday"
        name="Birthday"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.Birthday.split("T")[0]} // Format date properly
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        label="Address"
        name="Address"
        value={formData.Address}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit">
        Update Student
      </Button>
    </Box>
  );
}
