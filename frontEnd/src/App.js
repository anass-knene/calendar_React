import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Register/Login";
import Signup from "./components/Register/Signup";
import ToDo from "./components/todo/ToDo";
import Container from "./context/Container";
import "react-clock/dist/Clock.css";
import "./styles/App.scss";

function App() {
  return (
    <Container>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ToDo />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
