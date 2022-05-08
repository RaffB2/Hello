import React from "react";
import "./App.css";
import { SignUpForm } from "./components/Form/Form";
import { UserTable } from "./components/Table/Table";
import { useSelector } from "react-redux";

function App() {
  const isTableVisible = useSelector((state) => state.data.dataVisible);

  if (!isTableVisible) {
    return (
      <div className="App">
        <SignUpForm />
      </div>
    );
  }
  return (
    <div className="App">
      <UserTable />
    </div>
  );
}

export default App;
