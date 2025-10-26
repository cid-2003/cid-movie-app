import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./movie-list.scss";

import MovieCard from "../movie-card/MovieCard";
import tmdbApi, { category } from "./../../api/tmdbApi";

const MovieList = (props) => {
  const [items, setItems] = useState([]);
  const { i18n } = useTranslation();
  const { category: cat, type, id } = props;

  useEffect(() => {
    const getList = async () => {
      const languageCode = i18n.language;
      let response = null;

      try {
        if (type === "similar") {
          // Cas spécifique des films/séries similaires
          response = await tmdbApi.similar(cat, id, languageCode);
        } else {
          // Logique unifiée pour les listes (populaires, top rated, etc.)
          response =
            cat === category.movie
              ? await tmdbApi.getMoviesList(type, languageCode)
              : await tmdbApi.getTvList(type, languageCode);
        }

        setItems(response.results.slice(0, 10)); // 💡 Limite optionnelle si le composant doit être un carrousel
      } catch (error) {
        // En production, nous pourrions utiliser un service de logging (Sentry/Datadog)
        console.error("Failed to fetch TMDB data:", error);
      }
    };

    getList();

    // Dépendances: Recalcule si la catégorie, le type, l'ID ou la langue change
  }, [cat, type, id, i18n.language]);

  return (
    <div className="movie-list__wrapper">
      <div className="movie-list__content">
        {items.map((item, index) => (
          // Utilisation du `id` du film comme clé si disponible
          <div className="movie-list__item" key={item.id || index}>
            <MovieCard item={item} category={cat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
