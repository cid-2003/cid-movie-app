import React from "react";
import "swiper/css"; // ❌ L'import CSS devrait être global, mais on le conserve s'il est requis ici
import { useParams } from "react-router";

import MovieGrid from "../components/movie-grid/MovieGrid";
import PageHeader from "../components/page-header/PageHeader";
import { category as tmdbCategory } from "../api/tmdbApi"; // Renommage pour éviter la confusion

const Catalog = () => {
  // Récupère la catégorie (movie ou tv) de l'URL
  const { category } = useParams();
  // ❌ Suppression du console.log(category);

  return (
    <>
      <PageHeader>
        {/* Affiche le titre en fonction de la catégorie TMDB */}
        {category === tmdbCategory.movie ? "Movies" : "TV Series"}
      </PageHeader>

      <div className="container">
        <div className="section mb-3">
          {/* Affiche la grille des films ou séries */}
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
