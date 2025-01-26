import "./App.css";
import { useState } from "react";
import Calculator from "./Calculator.tsx";
import React from "react";
import Form from "./Form.tsx";
import Socket from "./Socket.tsx";

function App() {
  return (
    <>
      {/* <Calculator /> */}
      <Form />
      <Socket />
    </>
  );
}

export default App;
