import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom"; 
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay } from 'swiper/modules';

import Button, { OutlineButton } from "./../button/Button";
import Modal, { ModalContent } from "./../modal/Modal";

import tmdbApi, { category, movieType } from "./../../api/tmdbApi";
import apiConfig from "./../../api/apiConfig";
import * as Config from "./../../constants/Config";

import "./hero-slide.scss";
// Chemin de base pour la navigation
const HOME_PAGE_PATH = `/${Config.HOME_PAGE}/movie/`;

const HeroSlide = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        // Limite à 8 films pour le slider
        setMovieItems(response.results.slice(0, 8));
      } catch {
      }
    };
    getMovies();
  }, []); // Exécuté une seule fois

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]} 
        grabCursor
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
      >
        {/* Rendu des slides */}
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={isActive ? "active" : ""} // Syntaxe minifiée
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Rendu des Modals (un par film pour les trailers) */}
      {movieItems.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
};

// Composant pour chaque item du slider
const HeroSlideItem = props => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { item, className } = props;

  // Sélectionne l'image de fond la plus large disponible
  const background = apiConfig.originalImage(
    item.backdrop_path || item.poster_path
  );

  // Active le modal et charge la vidéo du trailer
  const setModalActive = async () => {
    // 💡 S'assurer que item.id n'est pas null avant de continuer
    if (!item.id) return; 
    
    const modal = document.querySelector(`#modal_${item.id}`);
    
    // 💡 category.movie est correct pour cet HeroSlide qui ne montre que des films
    const videos = await tmdbApi.getVideos(category.movie, item.id);

    if (modal) { // Vérification de l'existence du modal
        if (videos.results.length > 0) {
            const videoSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
            // 💡 Vérification de l'iframe avant l'attribution
            const iframe = modal.querySelector(".modal__content > iframe");
            if (iframe) {
                 iframe.setAttribute("src", videoSrc);
            }
        } else {
            modal.querySelector(".modal__content").innerHTML = t("No trailer available");
        }
    
        modal.classList.toggle("active");
    }
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button
              onClick={() => navigate(HOME_PAGE_PATH + item.id)} // Navigation simplifiée
            >
              {t("Watch now")}
            </Button>
            <OutlineButton onClick={setModalActive}>
              {t("Watch trailer")}
            </OutlineButton>
          </div>
        </div>

        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

// Composant Modal de la bande-annonce (Exporté pour être réutilisé dans Detail.jsx)
export const TrailerModal = props => {
  const { item } = props;
  const iframeRef = useRef(null);

  // Fonction appelée à la fermeture du modal pour stopper la vidéo
  const onClose = () => iframeRef.current?.setAttribute("src", "");

  return (
    // 'active={false}' est la valeur par défaut pour le modal
    <Modal id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;