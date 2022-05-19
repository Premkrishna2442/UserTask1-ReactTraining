import React from "react";
import "./App.css";
import SearchAppBar from "./components/SearchAppBar";
import FloatingActionButtonSize from "./components/AddButton";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Edit from "./components/Edit";
import TableComp from "./components/TableComp";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <SearchAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TableComp/>
                <FloatingActionButtonSize />{" "}
              </>
            }
          />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
