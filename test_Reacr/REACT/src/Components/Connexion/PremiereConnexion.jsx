import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PremiereConnexion = () => {
    const [matricule, setMatricule] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        const updatePasswordData = {
            Matricule: matricule,
            NewPassword: newPassword
        };

        try {
            const response = await axios.put('http://localhost:50476/api/infirmiers/update-password', updatePasswordData);
            console.log('Réponse de l\'API :', response.data);
            navigate(response.data.RedirectUrl);
        } catch (error) {
            console.error('Il y a eu une erreur lors de la mise à jour du mot de passe !', error);
            setError('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    return (
        <div>
            <h2>Première Connexion - Modification du Mot de Passe</h2>
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
                    <label>Nouveau Mot de Passe:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirmer le Nouveau Mot de Passe:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default PremiereConnexion;



