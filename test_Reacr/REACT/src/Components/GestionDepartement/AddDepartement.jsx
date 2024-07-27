import React, { useState } from "react";
import axios from "axios";

const AddDepartement = () => {
  const [nom, setNom] = useState("");
  // const [lits, setLits] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDepartement = {
      nom,
      // lit: lits.split(',').map(litId => ({ Id: litId.trim() }))
    };

    console.log("Envoi des données du département :", newDepartement);

    try {
      const response = await axios.post(
        "http://localhost:50476/api/departements",
        newDepartement
      );
      console.log("Réponse de l'API :", response.data);

      // Reset form fields
      setNom("");
      // setLits('');
    } catch (error) {
      console.error("Il y a eu une erreur!", error);
    }
  };

  return (
    <div>
      <h2>Ajouter un Département</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        {/* <div>
                    <label>Lits (IDs séparés par des virgules):</label>
                    <input
                        type="text"
                        value={lits}
                        onChange={(e) => setLits(e.target.value)}
                    />
                </div> */}
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddDepartement;
