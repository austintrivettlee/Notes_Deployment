import React from 'react';
import Dashboard from './components/Dashboard';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/api/notes/:id/edit" element={<EditNote />} />
          <Route path="/api/notes/new" element={<CreateNote />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
