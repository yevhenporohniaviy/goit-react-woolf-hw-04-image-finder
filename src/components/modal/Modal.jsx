import React, { useEffect } from 'react';

const Modal = ({ imgURL, imgAlt, toggleModal }) => {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };

    document.addEventListener('keydown', closeModal);

    return () => {
      document.removeEventListener('keydown', closeModal);
    };
  }, [toggleModal]);

  const closeModalOnClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className="Overlay" onClick={closeModalOnClick}>
      <div className="Modal">
        <img src={imgURL} alt={imgAlt} />
      </div>
    </div>
  );
};

export default Modal;
