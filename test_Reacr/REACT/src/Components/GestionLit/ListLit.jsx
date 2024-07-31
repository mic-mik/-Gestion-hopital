import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListLit = () => {
    const [lits, setLits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLits = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/lits');
                setLits(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des lits !", error);
            }
        };

        fetchLits();
    }, []);

    const handleView = (id) => {
        navigate(`/ViewLit/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/UpdateLit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:50476/api/lits/${id}`);
            setLits(lits.filter(lit => lit.IdLit !== id));
            alert('Lit supprimé avec succès');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la suppression du lit !", error);
        }
    };

    const handleAdd = () => {
        navigate(`/AddLit`);
    };

    return (
        <div>
            <h2>Liste des Lits
            <button onClick={() => handleAdd()}>Ajouter Lit</button>
          

            </h2>
            {lits.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Numéro du Lit</th>
                            <th>Est Occupé</th>
                            <th>Chambre</th>
                            <th>Nom du Département</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lits.map(lit => (
                            <tr key={lit.IdLit}>
                                <td>{lit.NumeroLit}</td>
                                <td>{lit.EstOccupe ? 'Oui' : 'Non'}</td>
                                <td>{lit.Chambre}</td>
                                <td>{lit.DepartmentName}</td>
                                <td>
                                    <button onClick={() => handleView(lit.IdLit)}>Voir</button>
                                    <button onClick={() => handleEdit(lit.IdLit)}>Modifier</button>
                                    <button onClick={() => handleDelete(lit.IdLit)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun lit trouvé.</p>
            )}
        </div>
    );
};

export default ListLit;
