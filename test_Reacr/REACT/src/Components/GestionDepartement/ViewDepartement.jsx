import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewDepartement = () => {
    const { id } = useParams();
    const [departement, setDepartement] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartement = async () => {
            try {
                console.log(`Fetching departement with ID: ${id}`);
                const response = await axios.get(`http://localhost:50476/api/departements/${id}`);
                console.log("Réponse de l'API :", response.data);
                setDepartement(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du département !", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartement();
    }, [id]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!departement) {
        return <p>Aucun département trouvé.</p>;
    }

    return (
        <div>
            <h2>Détails du Département</h2>
            <p><strong>Nom:</strong> {departement.Nom}</p>
        </div>
    );
};

export default ViewDepartement;
