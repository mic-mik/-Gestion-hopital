import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListPatient = () => {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/patients');
                setPatients(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des patients !", error);
            }
        };

        fetchPatients();
    }, []);

    const handleView = (id) => {
        navigate(`/view/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:50476/api/patients/${id}`);
            setPatients(patients.filter(patient => patient.Id !== id));
            alert('Patient supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression du patient !", error);
        }
    };

    return (
        <div>
            <h2>Liste des Patients</h2>
            {patients.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Date de Naissance</th>
                            <th>Téléphone</th>
                            <th>Rue</th>
                            <th>Ville</th>
                            <th>Code Postal</th>
                            <th>Province</th>
                            <th>Pays</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient.Id}>
                                <td>{patient.Prenom}</td>
                                <td>{patient.Nom}</td>
                                <td>{new Date(patient.DateNaissance).toLocaleDateString()}</td>
                                <td>{patient.Telephone}</td>
                                {patient.Adresse ? (
                                    <>
                                        <td>{patient.Adresse.Rue}</td>
                                        <td>{patient.Adresse.Ville}</td>
                                        <td>{patient.Adresse.CodePostal}</td>
                                        <td>{patient.Adresse.Province}</td>
                                        <td>{patient.Adresse.Pays}</td>
                                    </>
                                ) : (
                                    <>
                                        <td colSpan="5">Aucune adresse disponible</td>
                                    </>
                                )}
                                <td>
                                    <button onClick={() => handleView(patient.Id)}>Voir</button>
                                    <button onClick={() => handleEdit(patient.Id)}>Modifier</button>
                                    <button onClick={() => handleDelete(patient.Id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun patient trouvé.</p>
            )}
        </div>
    );
};

export default ListPatient;
