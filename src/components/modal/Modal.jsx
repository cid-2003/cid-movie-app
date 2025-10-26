import React, { useEffect, useRef, useState } from "react";
import "./modal.scss";

// Composant Modal principal
const Modal = props => {
  const [active, setActive] = useState(false);

  // Met à jour l'état interne si la prop 'active' change
  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    // 'active ? "active" : ""' est la syntaxe minifiée pour basculer la classe
    <div id={props.id} className={`modal ${active ? "active" : ""}`}>
      {props.children}
    </div>
  );
};


// Composant de contenu du Modal (avec bouton de fermeture)
export const ModalContent = props => {
  const contentRef = useRef(null);

  // Ferme le modal et exécute la fonction onClose fournie
  const closeModal = () => {
    // Navigue vers le parent (le Modal) et retire la classe 'active'
    if (contentRef.current) {
        contentRef.current.parentNode.classList.remove("active");
    }
    // Appel du callback externe pour nettoyer l'iframe (e.g. stopper la vidéo)
    if (props.onClose) props.onClose();
  };

  return (
    <div ref={contentRef} className="modal__content">
      {props.children}

      {/* Bouton de fermeture */}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};


export default Modal;