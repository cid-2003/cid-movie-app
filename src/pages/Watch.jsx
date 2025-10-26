import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import tmdbApi, { category as cate } from "../api/tmdbApi";

// 💡 Styles en ligne minimisés pour ce composant de page
const pageStyles = {
  minHeight: "80vh",
  paddingTop: "100px",
  backgroundColor: "#0a0a0a",
  color: "white",
};

const playerContainerStyles = {
  margin: "0 auto",
  maxWidth: "900px",
  aspectRatio: "16/9",
  backgroundColor: "#000",
  borderRadius: "8px",
  overflow: "hidden",
};

const Watch = () => {
  const { category, id } = useParams();
  const { t, i18n } = useTranslation();

  const [item, setItem] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        // 1. Charger les détails du média
        const detailResponse = await tmdbApi.detail(
          category,
          id,
          i18n.language
        );
        setItem(detailResponse);

        // 2. Charger les bandes-annonces
        // category de useParams est déjà correct (movie ou tv)
        const videoResponse = await tmdbApi.getVideos(category, id);

        // 3. Définir la source vidéo si une bande-annonce est disponible
        if (videoResponse.results.length > 0) {
          const firstVideoKey = videoResponse.results[0].key;
          // Ajout d'autoplay pour une meilleure expérience
          setVideoSrc(
            `https://www.youtube.com/embed/${firstVideoKey}?autoplay=1`
          );
        } else {
          setVideoSrc(null);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données du média:", error);
      }
    };
    loadMedia();
    window.scrollTo(0, 0);
  }, [category, id, i18n.language]);

  if (!item) {
    return (
      <div
        className="watch-page"
        style={{ ...pageStyles, textAlign: "center" }}
      >
        <h1>{t("Loading film")}...</h1>
      </div>
    );
  }

  const title = item.title || item.name;

  return (
    <div className="watch-page" style={pageStyles}>
      <div className="container">
        <h1
          style={{
            textAlign: "center",
            color: "#e50914",
            marginBottom: "10px",
          }}
        >
          {title}
        </h1>

        <div className="video-player-container" style={playerContainerStyles}>
          {videoSrc ? (
            <iframe
              width="100%"
              height="100%"
              src={videoSrc}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Bande-annonce de ${title}`}
              style={{ border: "none" }}
            />
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                padding: "20px",
              }}
            >
              {t("No video source available for this title.")}
            </div>
          )}
        </div>
      </div>
      <br />
    </div>
  );
};

export default Watch;
