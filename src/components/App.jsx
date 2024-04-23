import React, { useState, useEffect } from 'react';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import { fetchPicture } from './api/Api';
import Searchbar from 'components/searchbar/Searchbar';
import Loader from './loader/Loader';
import Button from './button/Button';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState({ url: '', alt: '' });
  const [loader, setLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const getPictures = async (q, page) => {
      setLoader(true);
      try {
        const data = await fetchPicture(q, page);
        if (data.hits.length === 0)
          return alert('Opps! There are no pictures available');

        setImages(prevImages => [...prevImages, ...data.hits]);
        setShowBtn(page < Math.ceil(data.totalHits / 12));
      } catch (error) {
        alert(error.message);
      } finally {
        setLoader(false);
      }
    };

    if (!query) return;

    getPictures(query, page);
  }, [query, page]);

  const onImageClick = obj => {
    setImage({
      url: obj.largeImageURL,
      alt: obj.tags,
    });
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const handleFilterSubmit = query => {
    setPage(1);
    setQuery(query);
    setImages([]);
  };

  const handleOnButtonClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <div>
        <Searchbar handleFilter={handleFilterSubmit} />
        <ImageGallery images={images} onImageClick={onImageClick} />
      </div>

      {showModal && (
        <Modal
          imgURL={image.url}
          imgAlt={image.alt}
          toggleModal={toggleModal}
        />
      )}

      {showBtn && <Button onClick={handleOnButtonClick} />}
      {loader && <Loader />}
    </>
  );
};

export default App;
