const apiConfig = {
    // URL de base de l'API TMDB
    baseURL: "https://api.themoviedb.org/3/",
    // Clé d'API (doit être masquée dans un vrai projet!)
    apiKey: "100df2124cba3ce4bf659cff601a2eff",
    
    // Construit le chemin d'API avec le code de langue
    getApiPath: (path, languageCode = 'en-US') => {
        // Supprime le '/' initial si présent (simplification)
        const formattedPath = path.startsWith('/') ? path.substring(1) : path;
        // Retourne le chemin formaté sans la clé API
        return `/${formattedPath}?language=${languageCode}`; 
    },

    // Construit l'URL complète pour l'image de taille originale
    originalImage: (imagePath) => `https://image.tmdb.org/t/p/original/${imagePath}`,
    // Construit l'URL complète pour l'image de taille w500
    w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`,
};

export default apiConfig;