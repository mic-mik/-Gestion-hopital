import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {
    const [matricule, setMatricule] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const connexionData = {
            Matricule: matricule,
            Password: password
        };

        try {
            const response = await axios.post('http://localhost:50476/api/infirmiers/connexion', connexionData);
            console.log('Réponse de l\'API :', response.data);
            navigate(response.data.RedirectUrl);
        } catch (error) {
            console.error('Il y a eu une erreur lors de la connexion !', error);
            setError('Matricule ou mot de passe invalide.');
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Matricule:</label>
                    <input
                        type="text"
                        value={matricule}
                        onChange={(e) => setMatricule(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Connexion;
