import React, { useEffect } from 'react';

const Modal = ({ imgURL, imgAlt, toggleModal }) => {
  const closeModal = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      toggleModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [closeModal]);

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        <img src={imgURL} alt={imgAlt} />
      </div>
    </div>
  );
};

export default Modal;
