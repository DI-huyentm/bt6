import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from the backend API
    axios
      .get("http://localhost:8080/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  const handleCreate = () => {
    // Redirect to create student page
    window.location.href = "/create-student";
  };

  const handleUpdate = (id) => {
    // Redirect to update student page
    window.location.href = `/update-student/${id}`;
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/students/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student.StudentId !== id));
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        style={{ marginBottom: "20px" }}
      >
        Create Student
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="student table">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Roll</TableCell>
              <TableCell align="right">Birthday</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.StudentId}>
                <TableCell component="th" scope="row">
                  {student.StudentId}
                </TableCell>
                <TableCell align="right">{student.Name}</TableCell>
                <TableCell align="right">{student.Roll}</TableCell>
                <TableCell align="right">
                  {new Date(student.Birthday).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">{student.Address}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleUpdate(student.StudentId)}
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(student.StudentId)}
                    // onClick={() => handleDeleteByName(student.Name)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
