import React from 'react';
import '../styles.css';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          onImageClick={onImageClick}
          key={image.id}
          image={image}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
