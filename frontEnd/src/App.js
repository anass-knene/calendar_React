import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/Register/Login";
import Signup from "./components/Register/Signup";
import ToDo from "./components/todo/ToDo";
import Container from "./context/Container";

import "./styles/App.scss";

function App() {
  return (
    <Container>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ToDo />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
