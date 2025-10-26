import React, { useEffect, useRef, useState } from "react";
import "swiper/css"; // ❌ Cet import CSS est conservé s'il est requis ici
import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";

const VideoList = (props) => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await tmdbApi.getVideos(category, props.id);
        // Limite l'affichage à 5 vidéos (bandes-annonces/featurettes)
        setVideos(response.results.slice(0, 5));
      } catch (error) {
        console.error("Erreur de récupération des vidéos:", error);
      }
    };
    getVideos();
    // Dépendances: Recalcule si la catégorie ou l'ID du média change
  }, [category, props.id]);

  return (
    <>
      {/* 💡 CORRECTION CRITIQUE : Utilisation explicite du 'return' dans la boucle .map */}
      {videos.map((item, index) => (
        <Video key={item.key || index} item={item} />
      ))}
    </>
  );
};

const Video = (props) => {
  const { item } = props;
  const iframeRef = useRef(null);

  // Calcule et ajuste la hauteur de l'iframe pour maintenir un ratio 16:9
  useEffect(() => {
    // 💡 Vérification de l'existence de la référence avant manipulation du DOM
    if (iframeRef.current) {
      const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
      iframeRef.current.setAttribute("height", height);
    }
  }, []); // Exécuté une seule fois au montage

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
        // Le height initial peut être omis ici puisque useEffect l'ajustera
      />
    </div>
  );
};

export default VideoList;
