import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDepartement = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [departement, setDepartement] = useState({
        nom: '',
        // lits: [] // Liste des lits associée au département
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDepartement = async () => {
            try {
                const response = await axios.get(`http://localhost:50476/api/departements/${id}`);
                console.log("Réponse de l'API :", response.data);
                const departementData = response.data;

                const updatedDepartement = {
                    nom: departementData.Nom || '',
                    // lits: departementData.Lit || [] // Assurez-vous que 'Lit' est correctement formaté
                };

                console.log("Departement Data to be set: ", updatedDepartement);
                setDepartement(updatedDepartement);
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du département !", error);
                setLoading(false);
            }
        };

        fetchDepartement();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartement(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const departementData = {
            nom: departement.nom || '',
            // lits: departement.lits || [] // Assurez-vous que les lits sont correctement formatés
        };

        console.log("Departement Data to be sent: ", departementData);

        try {
            await axios.put(`http://localhost:50476/api/departements/${id}`, departementData);
            console.log("Réponse de l'API :", departementData);
            alert('Département mis à jour avec succès');
            navigate('/');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour du département !", error);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Mettre à jour le Département</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={departement.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Lits Associés (IDs séparés par des virgules):</label>
                    <input
                        type="text"
                        name="lits"
                        // value={departement.lits.join(', ')}
                        onChange={(e) => setDepartement(prevState => ({
                            ...prevState,
                            // lits: e.target.value.split(',').map(id => id.trim())
                        }))}
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateDepartement;
