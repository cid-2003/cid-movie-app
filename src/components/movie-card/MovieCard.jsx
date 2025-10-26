import React from "react";
import { Link } from "react-router-dom";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import * as Config from "./../../constants/Config";

import Button from "../button/Button";
import "swiper/css";

import "./movie-card.scss";

const MovieCard = (props) => {
  const { item, category: propCategory } = props; // Destructuring et renommage de 'category'

  // Construction du lien avec template literals pour la concision
  const link = `/${Config.HOME_PAGE}/${category[propCategory]}/${item.id}`;

  // Choix de l'image (poster ou backdrop)
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <h3>{item.title || item.name}</h3>
    </Link>
  );
};

export default MovieCard;
