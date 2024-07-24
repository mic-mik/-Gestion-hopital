import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPatient from './Components/GestionPatient/AddPatient';
import ListPatient from './Components/GestionPatient/listPatient';
import UpdatePatient from './Components/GestionPatient/UpdatePatient';
import ViewPatient from './Components/GestionPatient/ViewPatient';
import Headers from './Components/Header/Headers';

function App() {
  return (
    <Router>
    <div className="App">
      <Headers />
      <main>
        <Routes>
          <Route path="/" element={<ListPatient />} />
          <Route path="/add" element={<AddPatient />} />
          <Route path="/update/:id" element={<UpdatePatient />} />
          <Route path="/view/:id" element={<ViewPatient />} />
        </Routes>
      </main>
    </div>
  </Router>
  );
}

export default App;
