import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import MovieCard from "./../movie-card/MovieCard";
import * as Config from "./../../constants/Config";

import "./movie-grid.scss";

// Chemin de base pour la navigation
const HOME_PAGE_PATH = `/${Config.HOME_PAGE}`;

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { keyword } = useParams();

  // 1. Logique de chargement initial et changement de langue/catégorie
  useEffect(() => {
    const getList = async () => {
      let response = null;
      const languageCode = i18n.language;
      const params = { page: 1 }; // Utilisation d'une seule fois

      try {
        if (keyword === undefined) {
          // Chargement des listes (Movies ou TV popular par défaut)
          response =
            props.category === category.movie
              ? await tmdbApi.getMoviesList(
                  movieType.upcoming,
                  languageCode,
                  params
                )
              : await tmdbApi.getTvList(tvType.popular, languageCode, params);
        } else {
          // Chargement des résultats de recherche
          params.query = keyword;
          response = await tmdbApi.search(props.category, languageCode, params);
        }

        setItems(response.results);
        setTotalPage(response.total_pages);
        setPage(1); // Réinitialiser la pagination lors d'un nouveau chargement
      } catch (error) {
        console.error("Erreur de chargement des listes/recherche:", error);
      }
    };
    getList();
  }, [keyword, props.category, i18n.language]); // Dépendances essentielles

  // 2. Logique de chargement de la page suivante
  const loadMore = async () => {
    let response = null;
    const nextPage = page + 1;
    const languageCode = i18n.language;

    const params = {
      page: nextPage,
      language: languageCode, // TMDB Api gère l'ajout automatique de la langue
      ...(keyword && { query: keyword }), // Ajout conditionnel de la query
    };

    try {
      if (keyword === undefined) {
        response =
          props.category === category.movie
            ? await tmdbApi.getMoviesList(
                movieType.upcoming,
                languageCode,
                params
              )
            : await tmdbApi.getTvList(tvType.popular, languageCode, params);
      } else {
        response = await tmdbApi.search(props.category, languageCode, params);
      }

      // Mise à jour de l'état
      setItems((prevItems) => [...prevItems, ...response.results]);
      setPage(nextPage);
    } catch (error) {
      console.error("Erreur de chargement de la page suivante:", error);
    }
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch category={props.category} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, index) => (
          // Utilisation du id du film comme clé si disponible, sinon index
          <MovieCard
            key={item.id || index}
            category={props.category}
            item={item}
          />
        ))}
      </div>

      {/* Bouton Charger plus conditionnel */}
      {page < totalPage && (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            {t("Load more")}
          </OutlineButton>
        </div>
      )}
    </>
  );
};

// ----------------------------------------------------
// Composant de recherche (Extraction)
// ----------------------------------------------------

const MovieSearch = (props) => {
  const navigate = useNavigate();
  const { category: propCategory, keyword: propKeyword } = props; // Destructuring
  const { t, i18n } = useTranslation();

  const [query, setQuery] = useState(propKeyword || "");

  // 1. Navigation par clic (bouton 'Search')
  const goToSearch = useCallback(() => {
    const searchPath = `${HOME_PAGE_PATH}/${
      category[propCategory]
    }/search/${query.trim()}`;
    if (query.trim().length > 0) {
      // 💡 Utilisation de 'navigate' au lieu de 'navigate.push'
      navigate(searchPath);
    }
  }, [query, propCategory, navigate]);

  // 2. Logique de Debounce (recherche en direct)
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmedQuery = query.trim();
      const currentKeyword = (propKeyword || "").trim();

      // Si la requête n'a pas changé depuis le dernier chargement
      if (trimmedQuery === currentKeyword) return;

      const targetPath =
        trimmedQuery.length > 0
          ? `${HOME_PAGE_PATH}/${category[propCategory]}/search/${trimmedQuery}` // Recherche
          : `${HOME_PAGE_PATH}/${category[propCategory]}`; // Retour à la liste par défaut

      navigate(targetPath);
    }, 300); // 300ms de délai

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [query, propCategory, navigate, propKeyword, i18n.language]);

  // 3. Gestion de la touche Entrée
  useEffect(() => {
    const enterEvent = (e) => {
      // Correction: keyCode pour 'Enter' est 13 ou 'key' est 'Enter'
      if (e.key === "Enter") {
        e.preventDefault();
        goToSearch();
      }
    };
    // Écouteur sur la fenêtre plutôt que sur le document (meilleure pratique)
    document.addEventListener("keyup", enterEvent);
    return () => document.removeEventListener("keyup", enterEvent);
  }, [goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder={"Recherche"} // Utilisation de la traduction
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        {t("Search")}
      </Button>
    </div>
  );
};

export default MovieGrid;
