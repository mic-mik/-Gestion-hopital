import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListMedecin = () => {
    const [medecins, setMedecins] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedecins = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/medecins');
                setMedecins(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des médecins !", error);
            }
        };

        fetchMedecins();
    }, []);

    const handleView = (id) => {
        navigate(`/ViewMedecin/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/UpdateMedecin/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:50476/api/medecins/${id}`);
            setMedecins(medecins.filter(medecin => medecin.IdMedecin !== id));
            alert('Médecin supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression du médecin !", error);
        }
    };
    const handleAdd = () => {
        navigate(`/AddMedecin`);
    };

    return (
        <div>
            <h2>Liste des Médecins
            <button onClick={() => handleAdd()}>Ajouter Médecin</button>
          

            </h2>
            {medecins.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Date de Naissance</th>
                            <th>Matricule</th>
                            <th>Département</th>
                            <th>Rue</th>
                            <th>Ville</th>
                            <th>Code Postal</th>
                            <th>Province</th>
                            <th>Pays</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medecins.map(medecin => (
                            <tr key={medecin.IdMedecin}>
                                <td>{medecin.Prenom}</td>
                                <td>{medecin.Nom}</td>
                                <td>{medecin.Email}</td>
                                <td>{medecin.Telephone}</td>
                                <td>{new Date(medecin.DateNaissance).toLocaleDateString()}</td>
                                <td>{medecin.Matricule}</td>
                                <td>{medecin.DepartmentName}</td>
                                <td>{medecin.Adresse?.Rue || 'N/A'}</td>
                                <td>{medecin.Adresse?.Ville || 'N/A'}</td>
                                <td>{medecin.Adresse?.CodePostal || 'N/A'}</td>
                                <td>{medecin.Adresse?.Province || 'N/A'}</td>
                                <td>{medecin.Adresse?.Pays || 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleView(medecin.IdMedecin)}>Voir</button>
                                    <button onClick={() => handleEdit(medecin.IdMedecin)}>Modifier</button>
                                    <button onClick={() => handleDelete(medecin.IdMedecin)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun médecin trouvé.</p>
            )}
        </div>
    );
};

export default ListMedecin;
