import React, { useEffect, useState } from 'react';

import PhotoCard from '../components/PhotoCard';
import PageButton from '../components/PageButton';

// ALL DATA
import dbData from '../fakeapi/db.json';

const Home = () => {
  // INIT
  // all images
  // current page
  // paginated images
  // page buttons
  // searched query
  // search by
  // error modal
  const [allImages, setallImages] = useState(dbData);
  const [currentPage, setcurrentPage] = useState(1);
  const [paginatedImages, setpaginatedImages] = useState([]);
  const [pageButtons, setpageButtons] = useState([]);
  const [searchQuery, setsearchQuery] = useState('');
  const [searchBy, setsearchBy] = useState({ id: false, albumId: false });
  const [errorModalOpen, seterrorModalOpen] = useState(false);

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

  // PAGINATION AND PAGE BUTTON CREATION
  const handlePagination = (imageArr, size) => {
    const tempcopy = [...imageArr];
    const paginatedArray = [];

    // create buttons
    const demo = new Array(Math.ceil(tempcopy.length / 20)).fill('1');
    setpageButtons(demo);

    // paginate original data to chunks of array
    demo.forEach(item => {
      const temparr = tempcopy.splice(0, size);
      paginatedArray.push(temparr);
    });

    if (paginatedArray.length > 0) {
      setpaginatedImages(paginatedArray);
      return;
    } else {
      seterrorModalOpen(true);
    }

    return 0;
  };

  // PAGINATE AT PAGE LOAD
  useEffect(() => {
    handlePagination(allImages, 20);
  }, []);

  // FILTERATION
  const handleSearch = (allImages, searchedQuery) => {
    const tempcopy = [...allImages];

    // set page current 0
    setcurrentPage(0);

    const cond1 = tempcopy.length > 0 && typeof searchQuery == 'string';
    const cond2 =
      tempcopy.length > 0 && typeof searchQuery == 'number' && searchBy.id;
    const cond3 =
      tempcopy.length > 0 && typeof searchQuery == 'number' && searchBy.albumId;

    if (cond1) {
      const filtered = tempcopy.filter(objs => {
        return objs.title.includes(searchedQuery);
      });
      handlePagination(filtered, 20);
      return;
    } else if (cond2) {
      const filtered = tempcopy.filter(objs => {
        return objs.id == searchedQuery;
      });
      handlePagination(filtered, 20);
      return;
    } else if (cond3) {
      const filtered = tempcopy.filter(objs => {
        return objs.albumId == searchedQuery;
      });

      handlePagination(filtered, 20);
      return;
    } else {
      seterrorModalOpen(true);

      return;
    }
  };

  return (
    <main className="homeContainer">
      <h2>Random Photo library</h2>

      {/* search bar */}
      <div className="photoFilterContainer">
        <input
          type="text"
          name="filterInfo"
          value={searchQuery}
          onChange={e => {
            if (Number(e.target.value)) {
              setsearchQuery(Number(e.target.value));
              return;
            } else {
              setsearchQuery(e.target.value);
              return;
            }
          }}
        />

        {/* filter buttons */}
        <button
          className="btn"
          onClick={() => {
            handleSearch(allImages, searchQuery);
          }}
        >
          Search
        </button>

        <button
          className="btn"
          onClick={() => {
            setsearchBy({ id: false, albumId: true });
          }}
          style={
            searchBy.albumId ? { background: 'yellow', color: 'black' } : {}
          }
        >
          By Album Id
        </button>
        <button
          className="btn"
          onClick={() => {
            setsearchBy({ id: true, albumId: false });
          }}
          style={searchBy.id ? { background: 'yellow', color: 'black' } : {}}
        >
          By Id
        </button>
      </div>

      {/* gallery */}

      {/* error modal */}
      <div
        className="errorModal"
        style={errorModalOpen ? { display: 'flex' } : { display: 'none' }}
      >
        <h2>Not found</h2>
        <button
          className="btn"
          onClick={() => {
            seterrorModalOpen(false);
            setsearchQuery('');
          }}
        >
          Go Back
        </button>
      </div>

      {/* main photos */}
      {!errorModalOpen && (
        <>
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
        </>
      )}
    </main>
  );
};

export default Home;
