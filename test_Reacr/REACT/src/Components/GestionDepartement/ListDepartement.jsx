import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListDepartement = () => {
    const [departements, setDepartements] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartements = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/departements');
                setDepartements(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des départements !", error);
            }
        };

        fetchDepartements();
    }, []);

    const handleView = (id) => {
        navigate(`/viewDepartement/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/updateDepartement/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:50476/api/departements/${id}`);
            setDepartements(departements.filter(departement => departement.IdDepartement !== id));
            alert('Département supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression du département !", error);
        }
    };

    const handleAdd = () => {
        navigate(`/AddDepartement`);
    };

    return (
        <div>
            <h2>Liste des Départements
            <button onClick={() => handleAdd()}>Ajouter Departement</button>
            </h2>


            {departements.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departements.map(departement => (
                            <tr key={departement.IdDepartement}>
                                <td>{departement.Nom}</td>
                                <td>
                                    <button onClick={() => handleView(departement.IdDepartement)}>Voir</button>
                                    <button onClick={() => handleEdit(departement.IdDepartement)}>Modifier</button>
                                    <button onClick={() => handleDelete(departement.IdDepartement)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun département trouvé.</p>
            )}
        </div>
    );
};

export default ListDepartement;
