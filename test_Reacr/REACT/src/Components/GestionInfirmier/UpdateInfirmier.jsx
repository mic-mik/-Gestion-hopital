import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateInfirmier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [matricule, setMatricule] = useState('');
    const [idDepartement, setIdDepartement] = useState('');
    const [departements, setDepartements] = useState([]);
    const [adresse, setAdresse] = useState({
        rue: '',
        ville: '',
        codePostal: '',
        province: '',
        pays: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfirmier = async () => {
            try {
                const response = await axios.get(`http://localhost:50476/api/infirmiers/${id}`);
                console.log("Réponse de l'API :", response.data);
                const infirmierData = response.data;

                setPrenom(infirmierData.Prenom || '');
                setNom(infirmierData.Nom || '');
                setEmail(infirmierData.Email || '');
                setTelephone(infirmierData.Telephone || '');
                setDateNaissance(infirmierData.DateNaissance ? infirmierData.DateNaissance.split('T')[0] : '');
                setMatricule(infirmierData.Matricule || '');
                setIdDepartement(infirmierData.IdDepartement || '');
                setAdresse({
                    rue: infirmierData.Adresse?.Rue || '',
                    ville: infirmierData.Adresse?.Ville || '',
                    codePostal: infirmierData.Adresse?.CodePostal || '',
                    province: infirmierData.Adresse?.Province || '',
                    pays: infirmierData.Adresse?.Pays || ''
                });
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération de l'infirmier !", error);
                setLoading(false);
            }
        };

        const fetchDepartements = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/lits/departments');
                console.log('Départements récupérés:', response.data);
                setDepartements(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des départements !", error);
            }
        };

        fetchInfirmier();
        fetchDepartements();
    }, [id]);

    const handleChangeAdresse = (e) => {
        const { name, value } = e.target;
        setAdresse((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedInfirmier = {
            Prenom: prenom,
            Nom: nom,
            Email: email,
            Telephone: telephone,
            DateNaissance: dateNaissance,
            Matricule: matricule,  // Include matricule in the update object but not in the form
            IdDepartement: idDepartement,
            Adresse: adresse
        };

        console.log("Envoi des données de l'infirmier :", updatedInfirmier, idDepartement);

        try {
            await axios.put(`http://localhost:50476/api/infirmiers/${id}`, {
                infirmier: updatedInfirmier,
                idDepartement: idDepartement
            });
            console.log("Réponse de l'API :", updatedInfirmier);
            alert('Infirmier mis à jour avec succès');
            navigate('/ListInfirmier');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour de l'infirmier !", error);
            console.error(error.response ? error.response.data : error.message);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Mettre à jour l'Infirmier</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Telephone:</label>
                    <input
                        type="text"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date de Naissance:</label>
                    <input
                        type="date"
                        value={dateNaissance}
                        onChange={(e) => setDateNaissance(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Département:</label>
                    <select
                        value={idDepartement}
                        onChange={(e) => {
                            setIdDepartement(e.target.value);
                            console.log("ID du département sélectionné:", e.target.value);
                        }}
                        required
                    >
                        <option value="">Sélectionnez un département</option>
                        {departements.map(departement => (
                            <option key={departement.IdDepartement} value={departement.IdDepartement}>
                                {departement.Nom}
                            </option>
                        ))}
                    </select>
                </div>
                <h3>Adresse</h3>
                <div>
                    <label>Rue:</label>
                    <input
                        type="text"
                        name="rue"
                        value={adresse.rue}
                        onChange={handleChangeAdresse}
                        required
                    />
                </div>
                <div>
                    <label>Ville:</label>
                    <input
                        type="text"
                        name="ville"
                        value={adresse.ville}
                        onChange={handleChangeAdresse}
                        required
                    />
                </div>
                <div>
                    <label>Code Postal:</label>
                    <input
                        type="text"
                        name="codePostal"
                        value={adresse.codePostal}
                        onChange={handleChangeAdresse}
                        required
                    />
                </div>
                <div>
                    <label>Province:</label>
                    <input
                        type="text"
                        name="province"
                        value={adresse.province}
                        onChange={handleChangeAdresse}
                        required
                    />
                </div>
                <div>
                    <label>Pays:</label>
                    <input
                        type="text"
                        name="pays"
                        value={adresse.pays}
                        onChange={handleChangeAdresse}
                        required
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateInfirmier;
