import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewLit = () => {
    const { id } = useParams();
    const [lit, setLit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLit = async () => {
            try {
                const response = await axios.get(`http://localhost:50476/api/lits/${id}`);
                console.log("Réponse de l'API :", response.data);
                setLit(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du lit !", error);
                setLoading(false);
            }
        };

        fetchLit();
    }, [id]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!lit) {
        return <p>Lit non trouvé.</p>;
    }

    return (
        <div>
            <h2>Détails du Lit</h2>
            <p><strong>Numéro du Lit:</strong> {lit.NumeroLit}</p>
            <p><strong>Est Occupé:</strong> {lit.EstOccupe ? 'Oui' : 'Non'}</p>
            <p><strong>Chambre:</strong> {lit.Chambre}</p>
            <p><strong>Nom du Département:</strong> {lit.DepartmentName}</p>
        </div>
    );
};

export default ViewLit;
