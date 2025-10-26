import axiosClient from "./axiosClient";

//Les constantes d'API à exporter
export const category = {
    movie: "movie",
    tv: "tv",
};

export const movieType = {
    upcoming: "upcoming",
    popular: "popular",
    top_rated: "top_rated",
};

export const tvType = {
    popular: "popular",
    top_rated: "top_rated",
    on_the_air: "on_the_air",
};

//Je mappe le code i18next au format TMDB
const getTMDBLanguageCode = (i18nCode) => {
    switch (i18nCode) {
        case 'fr':
            return 'fr-FR';
        case 'es':
            return 'es-ES';
        default:
            return 'en-US';
    }
};

const tmdbApi = {
    //Je récupère les listes de films (Upcoming, Popular, Top Rated)
    getMoviesList: (type, i18nCode, params = {}) => {
        const url = `movie/${movieType[type]}`;
        params.language = getTMDBLanguageCode(i18nCode);
        return axiosClient.get(url, { params });
    },
    //Je récupère les listes de séries TV (Popular, Top Rated, On The Air)
    getTvList: (type, i18nCode, params = {}) => {
        const url = `tv/${tvType[type]}`;
        params.language = getTMDBLanguageCode(i18nCode);
        return axiosClient.get(url, { params });
    },
    //Je récupère les vidéos (trailers) d'un média
    getVideos: (cate, id, i18nCode) => {
        const url = `${category[cate]}/${id}/videos`;
        const params = { language: getTMDBLanguageCode(i18nCode) };
        return axiosClient.get(url, { params });
    },
    // Recherche de média par mot-clé
    search: (cate, i18nCode, params = {}) => {
        const url = `search/${category[cate]}`;
        params.language = getTMDBLanguageCode(i18nCode);
        return axiosClient.get(url, { params });
    },
    //Je récupère les détails d'un média
    detail: (cate, id, i18nCode, params = {}) => {
        const url = `${category[cate]}/${id}`;
        params.language = getTMDBLanguageCode(i18nCode);
        return axiosClient.get(url, { params });
    },
    //Je récupère le casting ou encore acteurs ayant jouées dans le film
    credits: (cate, id, i18nCode) => {
        const url = `${category[cate]}/${id}/credits`;
        const params = { language: getTMDBLanguageCode(i18nCode) };
        return axiosClient.get(url, { params });
    },
    // Récupèration des médias similaires
    similar: (cate, id, i18nCode) => {
        const url = `${category[cate]}/${id}/similar`;
        const params = { language: getTMDBLanguageCode(i18nCode) };
        return axiosClient.get(url, { params });
    },
};

export default tmdbApi;