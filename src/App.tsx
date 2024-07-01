import React, { FC } from "react";
import "./App.css";
import TestForm from "./components/testing/TestForm/TestForm";
import { DataProvider } from "./context/dataContext";

const App: FC = () => {
  return (
    <DataProvider>
      <div className="App">
        <h1>Hello World</h1>
        <TestForm />
      </div>
    </DataProvider>
  );
};

export default App;
