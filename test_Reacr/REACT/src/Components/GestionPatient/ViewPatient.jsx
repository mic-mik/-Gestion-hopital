import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewPatient = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:50476/api/patients/${id}`);
                setPatient(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du patient !", error);
            }
        };

        fetchPatient();
    }, [id]);

    if (!patient) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Détails du Patient</h2>
            <p><strong>Prénom:</strong> {patient.Prenom}</p>
            <p><strong>Nom:</strong> {patient.Nom}</p>
            <p><strong>Date de Naissance:</strong> {new Date(patient.DateNaissance).toLocaleDateString()}</p>
            <p><strong>Email:</strong> {patient.Email}</p>
            <p><strong>Numéro d'Assurance Maladie:</strong> {patient.NumAssurMaladie}</p>
            <p><strong>Téléphone:</strong> {patient.Telephone}</p>
            {patient.Adresse ? (
                <div>
                    <h3>Adresse</h3>
                    <p><strong>Rue:</strong> {patient.Adresse.Rue}</p>
                    <p><strong>Ville:</strong> {patient.Adresse.Ville}</p>
                    <p><strong>Code Postal:</strong> {patient.Adresse.CodePostal}</p>
                    <p><strong>Province:</strong> {patient.Adresse.Province}</p>
                    <p><strong>Pays:</strong> {patient.Adresse.Pays}</p>
                </div>
            ) : (
                <p>Aucune adresse disponible</p>
            )}
        </div>
    );
};

export default ViewPatient;
