import React from "react";
import "./button.scss";

// Composant de bouton principal
const Button = (props) => {
  return (
    <button
      //J'applique la classe 'btn' et toute classe additionnelle
      className={`btn ${props.className || ""}`}
      // Exécute onClick si la prop est fournie
      onClick={props.onClick || null}
    >
      {props.children}
    </button>
  );
};

// Composant de bouton de contour (hérite de Button)
export const OutlineButton = (props) => {
  return (
    <Button
      // Ajoute la classe spécifique 'btn-outline',
      //Ajout de || dans CLassName pour garantir que si props.className est undefined, la chaîne de caractères reste valide.
      className={`btn-outline ${props.className || ""}`}
      onClick={props.onClick || null}
    >
      {props.children}
    </Button>
  );
};

export default Button;
