import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";

// Création de l'instance Axios configurée
const axiosClient = axios.create({ 
    baseURL: apiConfig.baseURL,
    headers: {
        // Définition du type de contenu JSON
        "Content-Type": "application/json",
    },
    // Ajout automatique de la clé API à toutes les requêtes
    paramsSerializer: params =>
        queryString.stringify({...params, api_key: apiConfig.apiKey}),
});

// Intercepteur de réponse pour simplifier la structure des données
axiosClient.interceptors.response.use(
    response => {
        // Retourne directement la propriété 'data' si elle existe
        if (response && response.data) return response.data;
        return response;
    },
    // Gestion des erreurs
    error => {
        throw error;
    }
);

export default axiosClient;