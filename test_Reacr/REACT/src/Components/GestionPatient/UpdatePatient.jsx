import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        prenom: '',
        nom: '',
        dateNaissance: '',
        email: '',
        numAssurMaladie: '',
        telephone: '',
        adresse: {
            rue: '',
            ville: '',
            codePostal: '',
            province: '',
            pays: ''
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:50476/api/patients/${id}`);
                console.log("Réponse de l'API :", response.data);
                const patientData = response.data;

                const adresse = {
                    rue: patientData.Adresse?.Rue || '',
                    ville: patientData.Adresse?.Ville || '',
                    codePostal: patientData.Adresse?.CodePostal || '',
                    province: patientData.Adresse?.Province || '',
                    pays: patientData.Adresse?.Pays || ''
                };

                const updatedPatient = {
                    prenom: patientData.Prenom || '',
                    nom: patientData.Nom || '',
                    dateNaissance: patientData.DateNaissance ? patientData.DateNaissance.split('T')[0] : '',
                    email: patientData.Email || '',
                    numAssurMaladie: patientData.NumAssurMaladie || '',
                    telephone: patientData.Telephone || '',
                    adresse: adresse
                };

                console.log("Patient Data to be set: ", updatedPatient);
                setPatient(updatedPatient);
                setLoading(false);
            } catch (error) {
                console.error("Il y a eu une erreur lors de la récupération du patient !", error);
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setPatient(prevState => ({
            ...prevState,
            adresse: {
                ...prevState.adresse,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const patientData = {
            prenom: patient.prenom,
            nom: patient.nom,
            dateNaissance: patient.dateNaissance,
            email: patient.email,
            numAssurMaladie: patient.numAssurMaladie,
            telephone: patient.telephone,
            adresse: {
                rue: patient.adresse.rue,
                ville: patient.adresse.ville,
                codePostal: patient.adresse.codePostal,
                province: patient.adresse.province,
                pays: patient.adresse.pays
            }
        };

        console.log("Patient Data to be sent: ", patientData);

        try {
            await axios.put(`http://localhost:50476/api/patients/${id}`, patientData);
            console.log("Réponse de l'API :", patientData);
            alert('Patient mis à jour avec succès');
            navigate('/ListPatient');
        } catch (error) {
            console.error("Il y a eu une erreur lors de la mise à jour du patient !", error);
        }
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h2>Mettre à jour le Patient</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={patient.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={patient.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date de Naissance:</label>
                    <input
                        type="date"
                        name="dateNaissance"
                        value={patient.dateNaissance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={patient.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Numéro d'Assurance Maladie:</label>
                    <input
                        type="text"
                        name="numAssurMaladie"
                        value={patient.numAssurMaladie}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Téléphone:</label>
                    <input
                        type="text"
                        name="telephone"
                        value={patient.telephone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rue:</label>
                    <input
                        type="text"
                        name="rue"
                        value={patient.adresse.rue}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Ville:</label>
                    <input
                        type="text"
                        name="ville"
                        value={patient.adresse.ville}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Code Postal:</label>
                    <input
                        type="text"
                        name="codePostal"
                        value={patient.adresse.codePostal}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Province:</label>
                    <input
                        type="text"
                        name="province"
                        value={patient.adresse.province}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <div>
                    <label>Pays:</label>
                    <input
                        type="text"
                        name="pays"
                        value={patient.adresse.pays}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdatePatient;
