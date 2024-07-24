import React from 'react';
import { Link } from 'react-router-dom';

const Headers = () => {
  return (
    <header className="App-header">
      <h1>Gestion de l'Hôpital</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Liste des Patients</Link>
          </li>
          <li>
            <Link to="/add">Ajouter un Patient</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default  Headers 
    ;
