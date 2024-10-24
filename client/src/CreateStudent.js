import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Box } from "@mui/material";

export default function CreateStudent() {
  const [formData, setFormData] = useState({
    StudentId: "",
    Name: "",
    Roll: "",
    Birthday: "",
    Address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to the backend to create a new student
    axios
      .post("http://localhost:8080/students", formData)
      .then((response) => {
        console.log("Student created:", response.data);
        // Redirect to student list after creation
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating student:", error);
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
        value={formData.Birthday}
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
        Create Student
      </Button>
    </Box>
  );
}
