import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewDepartement = () => {
  const { id } = useParams();
  const [departement, setDepartement] = useState(null);

  useEffect(() => {
    const fetchDepartement = async () => {
      try {
        const response = await axios.get(
          `http://localhost:50476/api/departements/${id}`
        );
        setDepartement(response.data);
      } catch (error) {
        console.error(
          "Il y a eu une erreur lors de la récupération du département !",
          error
        );
      }
    };

    fetchDepartement();
  }, [id]);

  if (!departement) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h2>Détails du Département</h2>
      <p>
        <strong>Nom:</strong> {departement.Nom}
      </p>
      {departement.Lit && departement.Lit.length > 0 ? (
        <div>
          <h3>Lits Associés</h3>
          <ul>
            {departement.Lit.map((lit, index) => (
              <li key={index}>ID du Lit: {lit}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Aucun lit associé disponible</p>
      )}
    </div>
  );
};

export default ViewDepartement;
