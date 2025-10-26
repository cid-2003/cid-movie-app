import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { OutlineButton } from "../components/button/Button";
import HeroSLide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";
import "swiper/css";

import { category, movieType, tvType } from "../api/tmdbApi";
import * as Config from "./../constants/Config";

// Chemin de base pour la navigation
const HOME_PAGE_PATH = `/${Config.HOME_PAGE}`;

// Composant réutilisable pour afficher une section de liste de films/séries
const ContentSection = ({ titleKey, listCategory, listType }) => {
  const { t } = useTranslation();

  // Définit le chemin de navigation (movie ou tv)
  const linkPath = `${HOME_PAGE_PATH}/${
    listCategory === category.movie ? "movie" : "tv"
  }`;

  return (
    <div className="section mb-3">
      <div className="section__header mb-2">
        <h2>{t(titleKey)}</h2>
        <Link to={linkPath}>
          <OutlineButton className="small">{t("more")}</OutlineButton>
        </Link>
      </div>
      <MovieList category={listCategory} type={listType} />
    </div>
  );
};

const Home = () => (
  <>
    <HeroSLide />
    <div className="container">
      {/* 1. Films tendances */}
      <ContentSection
        titleKey="trending Movies"
        listCategory={category.movie}
        listType={movieType.popular}
      />

      {/* 2. Films les mieux notés */}
      <ContentSection
        titleKey="top rated Movies"
        listCategory={category.movie}
        listType={movieType.top_rated}
      />

      {/* 3. Séries TV tendances */}
      <ContentSection
        titleKey="trending Tv"
        listCategory={category.tv}
        listType={tvType.popular}
      />

      {/* 4. Séries TV les mieux notées */}
      <ContentSection
        titleKey="top rated Tv"
        listCategory={category.tv}
        listType={tvType.top_rated}
      />
    </div>
  </>
);

export default Home;
