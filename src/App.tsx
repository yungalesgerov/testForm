import React, { FC } from "react";
import "./App.css";
import { DataProvider } from "./context/DataProvider";
import { TestForm } from "./components/TestForm";

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
