import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./CastList.scss";

// Placeholder pour une image de profil manquante
const PLACEHOLDER_IMAGE = "/chemin/vers/placeholder.jpg";

const CastList = (props) => {
  // Destructuring pour la concision
  const { category } = useParams();
  const { i18n } = useTranslation();

  const [cast, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      try {
        const response = await tmdbApi.credits(
          category,
          props.id,
          i18n.language
        );
        // Limite l'affichage à 15 membres de la distribution
        setCasts(response.cast.slice(0, 15));
      } catch (error) {
        console.error("Erreur de récupération des crédits:", error);
      }
    };
    getCredits();
    // Dépendances: Recalcule si la catégorie, l'ID du média ou la langue change
  }, [category, props.id, i18n.language]);

  return (
    <div className="casts-list">
      <div className="casts-list__wrapper">
        {cast.map((item) => (
          // 💡 Utilisation de item.credit_id ou item.id comme clé, plus stable que l'index
          <div className="cast__item" key={item.credit_id || item.id}>
            <div
              className="casts__item__img"
              style={{
                backgroundImage: `url(${
                  item.profile_path
                    ? apiConfig.w500Image(item.profile_path)
                    : PLACEHOLDER_IMAGE
                })`,
              }}
            />

            <p className="cast__item__name">{item.name}</p>
            <p className="cast__item__character">{item.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
