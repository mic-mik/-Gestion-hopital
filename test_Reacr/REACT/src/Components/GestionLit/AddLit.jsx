import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddLit = () => {
    const [numeroLit, setNumeroLit] = useState('');
    const [estOccupe, setEstOccupe] = useState(false);
    const [chambre, setChambre] = useState('');
    const [idDepartement, setIdDepartement] = useState('');
    const [departements, setDepartements] = useState([]);

    useEffect(() => {
        const fetchDepartements = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/lits/departments');
                console.log('Départements récupérés:', response.data);
                setDepartements(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des départements !", error);
            }
        };

        fetchDepartements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newLit = {
            NumeroLit: numeroLit,
            EstOccupe: estOccupe,
            Chambre: chambre
        };

        console.log("Envoi des données du lit :", newLit, idDepartement);

        try {
            const response = await axios.post('http://localhost:50476/api/lits', {
                lit: newLit,
                idDepartement: idDepartement
            });
            console.log("Réponse de l'API :", response.data);

            setNumeroLit('');
            setEstOccupe(false);
            setChambre('');
            setIdDepartement('');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la création du lit !", error);
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Ajouter un Lit</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Numéro du Lit:</label>
                    <input
                        type="text"
                        value={numeroLit}
                        onChange={(e) => setNumeroLit(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Est Occupé:</label>
                    <input
                        type="checkbox"
                        checked={estOccupe}
                        onChange={(e) => setEstOccupe(e.target.checked)}
                    />
                </div>
                <div>
                    <label>Chambre:</label>
                    <input
                        type="text"
                        value={chambre}
                        onChange={(e) => setChambre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Département:</label>
                    <select
                        value={idDepartement}
                        onChange={(e) => {
                            setIdDepartement(e.target.value);
                            console.log("ID du département sélectionné:", e.target.value);
                        }}
                        required
                    >
                        <option value="">Sélectionnez un département</option>
                        {departements.map(departement => (
                            <option key={departement.IdDepartement} value={departement.IdDepartement}>
                                {departement.Nom}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddLit;
