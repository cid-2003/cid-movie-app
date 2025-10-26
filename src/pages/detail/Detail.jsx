import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import "swiper/css";

import tmdbApi, { category as cate } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "./../../constants/Config";

import CastList from "../detail/CastList";
import VideoList from "../detail/VideoList";
import MovieList from "../../components/movie-list/MovieList";
import Button, { OutlineButton } from "../../components/button/Button"; // Import groupé
import { TrailerModal } from "../../components/hero-slide/HeroSlide";

import "./Details.scss";

// Chemin de base pour la navigation (pour concision)
const HOME_PAGE_PATH = `/${Config.HOME_PAGE}`;

const Detail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [item, setItem] = useState(null);

  // 1. Chargement des détails du média
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await tmdbApi.detail(category, id, i18n.language);
        setItem(response);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Erreur de chargement des détails:", error);
      }
    };
    getDetail();
  }, [category, id, i18n.language]);

  // 2. Activation du modal et chargement du trailer
  const setModalActive = async () => {
    if (!item?.id) return; // Sortie anticipée si l'item n'est pas prêt

    const modal = document.querySelector(`#modal_${item.id}`);
    if (!modal) return; // Sortie anticipée si le modal n'existe pas

    // La catégorie est déjà définie par useParams
    const videos = await tmdbApi.getVideos(category, item.id);

    const iframe = modal.querySelector(".modal__content iframe");
    const content = modal.querySelector(".modal__content");

    if (videos.results.length > 0) {
      const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;

      if (iframe) {
        iframe.setAttribute("src", videoSrc);
        // Assure que le contenu est propre si une erreur précédente a eu lieu
        iframe.style.display = "block";
        content.innerHTML = "";
        content.appendChild(iframe);
      } else {
        content.innerHTML = t("Error: Trailer iframe not found.");
      }
    } else {
      content.innerHTML = t("No trailer available");
    }

    modal.classList.toggle("active");
  };

  // 3. Rendu du composant
  if (!item) return null; // Retourne null tant que les données ne sont pas chargées

  // Utilisation de l'opérateur de coalescence pour choisir la meilleure image
  const background = apiConfig.originalImage(
    item.backdrop_path || item.poster_path
  );
  // Utilisation de l'opérateur de coalescence pour le titre/nom
  const title = item.title || item.name;

  return (
    <>
      <div className="banner" style={{ backgroundImage: `url(${background})` }}>
        <div className="movie-content__details">
          <div className="movie-content__details__info">
            <h1 className="title">{title}</h1>
            <p className="overview">{item.overview}</p>{" "}
            <div className="btns">
              <Button
                onClick={() =>
                  navigate(`${HOME_PAGE_PATH}/${category}/play/${item.id}`)
                }
              >
                {t("Watch now")}
              </Button>
              <OutlineButton onClick={setModalActive}>
                {t("Watch trailer")}
              </OutlineButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Affichages des acteurs */}
        <div className="casts section mb-3">
          <div className="section__header mb-2">
            <h2>{t("Casting")}</h2>
          </div>
          <CastList id={item.id} category={category} />
        </div>

        {/* Bandes-annonces */}
        <div className="section mb-3">
          <VideoList id={item.id} category={category} />
        </div>

        {/* Contenu Similaire */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>
              {t("Similar")}{" "}
              {category === cate.movie ? t("Movies") : t("TV Series")}
            </h2>
          </div>
          <MovieList category={category} type="similar" id={item.id} />
        </div>
      </div>

      {/* Modal de la bande-annonce (uniquement quand item est chargé) */}
      <TrailerModal item={item} />
    </>
  );
};

export default Detail;
