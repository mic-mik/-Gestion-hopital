import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMedecin = () => {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [idDepartement, setIdDepartement] = useState('');
    const [departements, setDepartements] = useState([]);
    const [adresse, setAdresse] = useState({
        rue: '',
        ville: '',
        codePostal: '',
        province: '',
        pays: ''
    });

    useEffect(() => {
        const fetchDepartements = async () => {
            try {
                const response = await axios.get('http://localhost:50476/api/lits/departments');
                console.log('Départements récupérés:', response.data);
                setDepartements(response.data);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération des départements !", error);
            }
        };

        fetchDepartements();
    }, []);

    const handleChangeAdresse = (e) => {
        const { name, value } = e.target;
        setAdresse((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMedecin = {
            Prenom: prenom,
            Nom: nom,
            Email: email,
            Telephone: telephone,
            DateNaissance: dateNaissance,
            IdDepartement: idDepartement,
            Adresse: adresse
        };

        console.log("Envoi des données du médecin :", newMedecin);

        try {
            const response = await axios.post('http://localhost:50476/api/medecins', {
                medecin: newMedecin,
                idDepartement: idDepartement
            });
            console.log("Réponse de l'API :", response.data);

            setPrenom('');
            setNom('');
            setEmail('');
            setTelephone('');
            setDateNaissance('');
            setIdDepartement('');
            setAdresse({
                rue: '',
                ville: '',
                codePostal: '',
                province: '',
                pays: ''
            });
        } catch (error) {
            console.error("Il y a eu une erreur lors de la création du médecin !", error);
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Ajouter un Médecin</h2>
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
                    <label>Téléphone:</label>
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
         
                <h3>Département</h3>
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
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddMedecin;
