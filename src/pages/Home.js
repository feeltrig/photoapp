import React, { useEffect, useState } from 'react';

import PhotoCard from '../components/PhotoCard';
import PageButton from '../components/PageButton';

const Home = () => {
  // INIT
  // pagination pages
  const [allImages, setallImages] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [paginatedImages, setpaginatedImages] = useState([]);
  const [pageButtons, setpageButtons] = useState([]);

  // FETCH DATA
  useEffect(() => {
    const fetchImages = async () => {
      const data = fetch(process.env.FETCH_IMAGES_API);
      const response = await data.json();

      if (data.status < 403) {
        return response;
      } else {
        alert('Connection error');
      }
    };

    fetchImages()
      .then(result => {
        setallImages(result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // split data for pagination
  const handlePagination = () => {
    const temp = [...allImages];
    const demo = new Array(Math.ceil(temp.length / 20)).fill('1');

    setpageButtons(demo);

    demo.forEach(item => {
      const temparr = temp.splice(0, 20);
      setpaginatedImages(prev => {
        return [...prev, temparr];
      });
    });
  };

  return (
    <main>
      <h2>Random Photo library</h2>
      <div className="photoGrid">
        {paginatedImages[currentPage]?.map(objs => {
          return <PhotoCard imageObj={objs} />;
        })}
      </div>
      <div className="pageButtonContainer">
        {pageButtons.map((items, index) => {
          return (
            <PageButton setcurrentPage={setcurrentPage} text={index + 1} />
          );
        })}
      </div>
    </main>
  );
};

export default Home;
