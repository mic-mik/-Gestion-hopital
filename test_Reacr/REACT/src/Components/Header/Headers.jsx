import React from 'react';
import { Link } from 'react-router-dom';

const Headers = () => {
  return (
    <header className="App-header">
      <h1>Gestion de l'Hôpital</h1>
      <nav>
        <ul>
        <li>
            <Link to="/"> Accueil  </Link>
          </li>
          <li>
            <Link to="/ListPatient">Liste des Patients</Link>
          </li>
          <li>
            <Link to="/listDepartement">Liste des Departements</Link>
          </li>
          <li>
            <Link to="/ListLit">Liste des Lits</Link>
          </li>
          <li>
            <Link to="/ListInfirmier">Liste des Infirmiers</Link>
          </li>

          <li>
            <Link to="/ListMedecin">Liste des Medecin</Link>
          </li>

          <li>
            <Link to="/Connexion">Connexion  </Link>
          </li>

        </ul>
      </nav>
    </header>
  );
};

export default  Headers 
    ;
