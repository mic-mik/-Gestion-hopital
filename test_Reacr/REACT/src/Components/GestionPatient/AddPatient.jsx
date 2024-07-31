import React, { useState } from 'react';
import axios from 'axios';

const AddPatient = () => {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [email, setEmail] = useState('');
    const [numAssurMaladie, setNumAssurMaladie] = useState('');
    const [rue, setRue] = useState('');
    const [ville, setVille] = useState('');
    const [province, setProvince] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [pays, setPays] = useState('');
    const [telephone, setTelephone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPatient = {
            prenom,
            nom,
            dateNaissance,
            email,
            numAssurMaladie,
            telephone,
            adresse: {
                rue,
                ville,
                codePostal,
                pays,
                province,
            }
        };

        console.log("Envoi des données du patient :", newPatient);

        try {
            const response = await axios.post('http://localhost:50476/api/patients', newPatient);
            console.log("Réponse de l'API :", response.data);

            setPrenom('');
            setNom('');
            setTelephone('');
            setDateNaissance('');
            setEmail('');
            setNumAssurMaladie('');
            setRue('');
            setVille('');
            setCodePostal('');
            setPays('');
            setProvince('');
        } catch (error) {
            console.error("Il y a eu une erreur!", error);
        }
    };

    return (
        <div>
            <h2>Ajouter un Patient</h2>
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
                    <label>Numéro d'Assurance Maladie:</label>
                    <input
                        type="text"
                        value={numAssurMaladie}
                        onChange={(e) => setNumAssurMaladie(e.target.value)}
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
                    <label>Rue:</label>
                    <input
                        type="text"
                        value={rue}
                        onChange={(e) => setRue(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ville:</label>
                    <input
                        type="text"
                        value={ville}
                        onChange={(e) => setVille(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Province:</label>
                    <input
                        type="text"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Code Postal:</label>
                    <input
                        type="text"
                        value={codePostal}
                        onChange={(e) => setCodePostal(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Pays:</label>
                    <input
                        type="text"
                        value={pays}
                        onChange={(e) => setPays(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddPatient;
