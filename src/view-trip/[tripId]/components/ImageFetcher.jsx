import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageFetcher = ({ imageName, className }) => {
  const [imageUrl, setImageUrl] = useState('/placeholder.jpg');

  useEffect(() => {
    const fetchImage = async () => {
      if (imageName) {
        try {
          const response = await axios.get(
            `https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_IMAGE_API_KEY}&q=${encodeURIComponent(imageName)}&image_type=photo&per_page=5`
          );
          const images = response.data.hits;

          if (images.length > 0) {
            // Pick a random image from the first 5 results
            const randomIndex = Math.floor(Math.random() * images.length);
            setImageUrl(images[randomIndex].webformatURL);
          }
        } catch (error) {
          console.error('Error fetching image from Pixabay:', error);
        }
      }
    };

    fetchImage();
  }, [imageName]);

  return (
    <img src={imageUrl} alt={imageName} className={className} />
  );
};

export default ImageFetcher;
