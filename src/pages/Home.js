import React, { useEffect, useState } from 'react';

import PhotoCard from '../components/PhotoCard';
import PageButton from '../components/PageButton';

// ALL DATA
import dbData from '../fakeapi/db.json';

const Home = () => {
  // INIT
  // pagination pages
  const [allImages, setallImages] = useState(dbData);
  const [currentPage, setcurrentPage] = useState(1);
  const [paginatedImages, setpaginatedImages] = useState([]);
  const [pageButtons, setpageButtons] = useState([]);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  // FETCH DATA
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const data = fetch(process.env.FETCH_IMAGES_API);
  //     const response = await data.json();

  //     if (data.status < 403) {
  //       return response;
  //     } else {
  //       alert('Connection error');
  //     }
  //   };

  //   fetchImages()
  //     .then(result => {
  //       setallImages(result);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  // split data for pagination
  const handlePagination = (allImages, size) => {
    const temp = [...allImages];
    const paginatedArray = [];
    const demo = new Array(Math.ceil(temp.length / 20)).fill('1');

    setpageButtons(demo);

    demo.forEach(item => {
      const temparr = temp.splice(0, size);
      paginatedArray.push(temparr);
    });

    setpaginatedImages(paginatedArray);

    console.log(paginatedImages);
    return;
  };

  useEffect(() => {
    handlePagination(allImages, 20);
  }, []);

  return (
    <main className="homeContainer">
      <h2>Random Photo library</h2>
      <div className="photoFilterContainer">
        <input type="text" name="filterInfo" />
        <button className="btn">By Album Id</button>
        <button className="btn">By Id</button>
      </div>
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
