import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewMedecin = () => {
    const { id } = useParams();
    const [medecin, setMedecin] = useState(null);

    useEffect(() => {
        const fetchMedecin = async () => {
            try {
                const response = await axios.get(`http://localhost:50476/api/medecins/${id}`);
                setMedecin(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du médecin !", error);
            }
        };

        fetchMedecin();
    }, [id]);

    if (!medecin) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Détails du Médecin</h2>
            <p><strong>Prénom:</strong> {medecin.Prenom}</p>
            <p><strong>Nom:</strong> {medecin.Nom}</p>
            <p><strong>Email:</strong> {medecin.Email}</p>
            <p><strong>Téléphone:</strong> {medecin.Telephone}</p>
            <p><strong>Date de Naissance:</strong> {new Date(medecin.DateNaissance).toLocaleDateString()}</p>
            <p><strong>Matricule:</strong> {medecin.Matricule}</p>
            <p><strong>Nom du Département:</strong> {medecin.DepartmentName}</p>
            {medecin.Adresse ? (
                <div>
                    <h3>Adresse</h3>
                    <p><strong>Rue:</strong> {medecin.Adresse.Rue}</p>
                    <p><strong>Ville:</strong> {medecin.Adresse.Ville}</p>
                    <p><strong>Code Postal:</strong> {medecin.Adresse.CodePostal}</p>
                    <p><strong>Province:</strong> {medecin.Adresse.Province}</p>
                    <p><strong>Pays:</strong> {medecin.Adresse.Pays}</p>
                </div>
            ) : (
                <p>Aucune adresse disponible</p>
            )}
        </div>
    );
};

export default ViewMedecin;
