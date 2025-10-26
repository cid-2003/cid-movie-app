import React from "react";
import "./input.scss";

// Composant d'entrée générique
const Input = (props) => {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      // Passe directement la fonction onChange, si elle existe.
      // Cela évite de créer une fonction anonyme inutile à chaque rendu.
      onChange={props.onChange || null}
    />
  );
};

export default Input;
