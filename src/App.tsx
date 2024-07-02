import React, { FC } from "react";
import "./App.css";
import TestForm from "./components/testing/TestForm/TestForm";
import { DataProvider } from "./context/dataContext";

const App: FC = () => {
  return (
    <DataProvider>
      <div className="App">
        <TestForm />
      </div>
    </DataProvider>
  );
};

export default App;
