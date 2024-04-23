import React, { useState, useEffect } from 'react';
import ImageGallery from './imageGallery/ImageGallery';
import Modal from './modal/Modal';
import { fetchPicture } from './api/Api';
import Searchbar from 'components/searchbar/Searchbar';
import Loader from './loader/Loader';
import Button from './button/Button';

const App = () => {
  const [pageFilterState, setPageFilterState] = useState({
    page: 1,
    filter: '',
  });
  const [otherState, setOtherState] = useState({
    images: [],
    showModal: false,
    image: { url: '', alt: '' },
    loader: false,
    showBtn: false,
  });

  useEffect(() => {
    if (pageFilterState.filter !== '' || pageFilterState.page !== 1) {
      getPictures(pageFilterState.filter, pageFilterState.page);
    }
  }, [pageFilterState]);

  const onImageClick = obj => {
    setOtherState(prevState => ({
      ...prevState,
      image: {
        url: obj.largeImageURL,
        alt: obj.tags,
      },
      showModal: true,
    }));
  };

  const toggleModal = () => {
    setOtherState(prevState => ({
      ...prevState,
      showModal: !prevState.showModal,
    }));
  };

  const handleFilterSubmit = filter => {
    setPageFilterState({ page: 1, filter });
    setOtherState(prevState => ({
      ...prevState,
      images: [],
    }));
  };

  const handleOnButtonClick = () => {
    setPageFilterState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  const getPictures = async (value, page) => {
    setOtherState(prevState => ({
      ...prevState,
      loader: true,
    }));
    try {
      const data = await fetchPicture(value, page);
      if (data.hits.length === 0)
        return alert('Opps! There are no pictures available');

      setOtherState(prevState => ({
        ...prevState,
        images: [...prevState.images, ...data.hits],
        showBtn: page < Math.ceil(data.totalHits / 12),
      }));
    } catch (error) {
      alert(error.message);
    } finally {
      setOtherState(prevState => ({
        ...prevState,
        loader: false,
      }));
    }
  };

  return (
    <>
      <div>
        <Searchbar handleFilter={handleFilterSubmit} />
        <ImageGallery images={otherState.images} onImageClick={onImageClick} />
      </div>

      {otherState.showModal && (
        <Modal
          imgURL={otherState.image.url}
          imgAlt={otherState.image.alt}
          toggleModal={toggleModal}
        />
      )}

      {otherState.showBtn && <Button onClick={handleOnButtonClick} />}
      {otherState.loader && <Loader />}
    </>
  );
};

export default App;
