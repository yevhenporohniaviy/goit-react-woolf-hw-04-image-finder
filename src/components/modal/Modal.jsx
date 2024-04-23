import React, { useEffect, useCallback } from 'react';

const Modal = ({ imgURL, imgAlt, toggleModal }) => {
  const closeModal = useCallback(
    e => {
      if (e.code === 'Escape' || e.target === e.currentTarget) {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    const handleKeyDown = e => closeModal(e);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
