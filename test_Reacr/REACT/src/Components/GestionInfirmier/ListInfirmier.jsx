import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListInfirmier = () => {
    const [infirmiers, setInfirmiers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfirmiers = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/infirmiers');
                setInfirmiers(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des infirmiers !", error);
            }
        };

        fetchInfirmiers();
    }, []);

    const handleView = (id) => {
        navigate(`/ViewInfirmier/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/UpdateInfirmier/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:50476/api/infirmiers/${id}`);
            setInfirmiers(infirmiers.filter(infirmier => infirmier.IdInfirmier !== id));
            alert('Infirmier supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression de l'infirmier !", error);
        }
    };
    const handleAdd = () => {
        navigate(`/AddInfirmier`);
    };

    return (
        <div>
            <h2>Liste des Infirmiers
            <button onClick={() => handleAdd()}>Ajouter Infirmier</button>
          
            </h2>
            {infirmiers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Téléphone</th>                           
                            <th>Date de Naissance</th>
                            <th>Matricule</th>
                            <th>Nom du Département</th>
                            <th>Rue</th>
                            <th>Ville</th>
                            <th>Code Postal</th>
                            <th>Province</th>
                            <th>Pays</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infirmiers.map(infirmier => (
                            <tr key={infirmier.IdInfirmier}>
                                <td>{infirmier.Prenom}</td>
                                <td>{infirmier.Nom}</td>
                                <td>{infirmier.Email}</td>
                                <td>{infirmier.Telephone}</td>
                                <td>{new Date(infirmier.DateNaissance).toLocaleDateString()}</td>
                                <td>{infirmier.Matricule}</td>
                                <td>{infirmier.DepartmentName}</td>
                                <td>{infirmier.Adresse?.Rue || 'N/A'}</td>
                                <td>{infirmier.Adresse?.Ville || 'N/A'}</td>
                                <td>{infirmier.Adresse?.CodePostal || 'N/A'}</td>
                                <td>{infirmier.Adresse?.Province || 'N/A'}</td>
                                <td>{infirmier.Adresse?.Pays || 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleView(infirmier.IdInfirmier)}>Voir</button>
                                    <button onClick={() => handleEdit(infirmier.IdInfirmier)}>Modifier</button>
                                    <button onClick={() => handleDelete(infirmier.IdInfirmier)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun infirmier trouvé.</p>
            )}
        </div>
    );
};

export default ListInfirmier;
