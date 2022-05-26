import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/Register/Login";
import ToDo from "./components/todo/ToDo";
import Container from "./context/Container";

import "./styles/App.scss";

function App() {
  return (
    <Container>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo" element={<ToDo />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
