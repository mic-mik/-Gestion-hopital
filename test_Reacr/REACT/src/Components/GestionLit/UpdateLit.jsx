import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateLit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [numeroLit, setNumeroLit] = useState('');
    const [estOccupe, setEstOccupe] = useState(false);
    const [chambre, setChambre] = useState('');
    const [idDepartement, setIdDepartement] = useState('');
    const [departements, setDepartements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLit = async () => {
            try {
                const response = await axios.get(`http://localhost:50476/api/lits/${id}`);
                console.log("Réponse de l'API :", response.data);
                const litData = response.data;

                setNumeroLit(litData.NumeroLit || '');
                setEstOccupe(litData.EstOccupe || false);
                setChambre(litData.Chambre || '');
                setIdDepartement(litData.IdDepartement || '');
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du lit !", error);
                setLoading(false);
            }
        };

        const fetchDepartements = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/lits/departments');
                console.log('Départements récupérés:', response.data);
                setDepartements(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des départements !", error);
            }
        };

        fetchLit();
        fetchDepartements();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedLit = {
            NumeroLit: numeroLit,
            EstOccupe: estOccupe,
            Chambre: chambre
        };

        console.log("Envoi des données du lit :", updatedLit, idDepartement);

        try {
            await axios.put(`http://localhost:50476/api/lits/${id}`, {
                lit: updatedLit,
                idDepartement: idDepartement
            });
            console.log("Réponse de l'API :", updatedLit);
            alert('Lit mis à jour avec succès');
            navigate('/ListLit');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour du lit !", error);
            console.error(error.response ? error.response.data : error.message);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Mettre à jour le Lit</h2>
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
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateLit;
