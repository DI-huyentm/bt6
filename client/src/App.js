import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentList from "./StudentList";
import CreateStudent from "./CreateStudent";
import UpdateStudent from "./UpdateStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/create-student" element={<CreateStudent />} />
        <Route path="/update-student/:id" element={<UpdateStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
