import React from "react";
import "./page-header.scss";
import bg from "../../assets/footer-bg.jpg";

// Composant d'en-tête de page
const PageHeader = (props) => (
  <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
    <h2>{props.children}</h2>
  </div>
);

export default PageHeader;
