import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPatient from './Components/GestionPatient/AddPatient';
import ListPatient from './Components/GestionPatient/listPatient';
import UpdatePatient from './Components/GestionPatient/UpdatePatient';
import ViewPatient from './Components/GestionPatient/ViewPatient';
import Headers from './Components/Header/Headers';
import AddDepartement from './Components/GestionDepartement/AddDepartement';
import ListDepartement from './Components/GestionDepartement/ListDepartement';
import ViewDepartement from './Components/GestionDepartement/ViewDepartement';
import UpdateDepartement from './Components/GestionDepartement/UpdateDepartement';
import AddLit from './Components/GestionLit/AddLit';
import ListLit from './Components/GestionLit/ListLit';
import UpdateLit from './Components/GestionLit/UpdateLit';
import ViewLit from './Components/GestionLit/ViewLit';
import Index from './Components/Header/Index';
import AddInfirmier from './Components/GestionInfirmier/AddInfirmier';
import ListInfirmier from './Components/GestionInfirmier/ListInfirmier';
import ViewInfirmier from './Components/GestionInfirmier/ViewInfirmier';
import UpdateInfirmier from './Components/GestionInfirmier/UpdateInfirmier';
import AddMedecin from './Components/GestionMedecin/AddMedecin';
import ListMedecin from './Components/GestionMedecin/ListMedecin';
import ViewMedecin from './Components/GestionMedecin/ViewMedecin';
import UpdateMedecin from './Components/GestionMedecin/UpdateMedecin';
import Connexion from './Components/Connexion/Connexion';
import Accueil from './Components/Accueil/Accueil';
import PremiereConnexion from './Components/Connexion/PremiereConnexion';



function App() {
  return (
    <Router>
    <div className="App">
      <Headers />
      <main>
        <Routes>
          <Route path="/" element={<Index />} /> 
          <Route path="/Connexion" element={<Connexion />} />
          <Route path="/PremiereConnexion" element={<PremiereConnexion />} />
          <Route path="/Accueil" element={<Accueil />} />


          <Route path="/ListPatient" element={<ListPatient />} />
          <Route path="/listDepartement" element={<ListDepartement />} />
          <Route path="/ListLit" element={<ListLit />} />
          <Route path="/ListInfirmier" element={<ListInfirmier />} />
          <Route path="/ListMedecin" element={<ListMedecin />} />

          <Route path="/AddInfirmier" element={<AddInfirmier />} />
          <Route path="/addPatients" element={<AddPatient />} />
          <Route path="/AddDepartement" element={<AddDepartement />} />
          <Route path="/AddLit" element={<AddLit />} />
          <Route path="/AddMedecin" element={<AddMedecin />} />

          
          <Route path="/updatePatients/:id" element={<UpdatePatient />} />
          <Route path="/UpdateDepartement/:id" element={<UpdateDepartement />} />
          <Route path="/UpdateLit/:id" element={<UpdateLit />} />
          <Route path="/UpdateInfirmier/:id" element={<UpdateInfirmier />} />
          <Route path="/UpdateMedecin/:id" element={<UpdateMedecin />} />


          <Route path="/viewPatients/:id" element={<ViewPatient />} />
          <Route path="/ViewDepartement/:id" element={<ViewDepartement />} />
          <Route path="/ViewLit/:id" element={<ViewLit />} />
          <Route path="/ViewInfirmier/:id" element={<ViewInfirmier />} />
          <Route path="/ViewMedecin/:id" element={<ViewMedecin />} />
        </Routes>
      </main>
    </div>
  </Router>
  );
}

export default App;
