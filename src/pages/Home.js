import React, { useEffect, useState } from 'react';

import PhotoCard from '../components/PhotoCard';
import PageButton from '../components/PageButton';

// ALL DATA
// import dbData from '../fakeapi/db.json';

const Home = () => {
  // INIT
  // all images
  // current page
  // paginated images
  // page buttons
  // searched query
  // search by
  // error modal
  // loading
  const [allImages, setallImages] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [paginatedImages, setpaginatedImages] = useState([]);
  const [pageButtons, setpageButtons] = useState([]);
  const [searchQuery, setsearchQuery] = useState('');
  const clearSearchBy = { id: false, albumId: false };
  const [searchBy, setsearchBy] = useState(clearSearchBy);
  const [errorModalOpen, seterrorModalOpen] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    const fetchImages = async () => {
      const data = await fetch(process.env.REACT_APP_FETCH_IMAGES_API);
      const response = await data.json();

      if (data.status < 403) {
        return response;
      } else {
        alert('Connection error');
        return;
      }
    };

    fetchImages()
      .then(res => {
        setallImages(res);
        handlePagination(allImages, 20);
        seterrorModalOpen(false);
        setisLoading(false);
      })
      .catch(err => {
        alert('Connectionerror');
        return;
      });
  }, []);

  useEffect(() => {
    handlePagination(allImages, 20);
  }, [allImages]);

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
  useEffect(() => {}, []);

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

    if (cond1 && searchQuery == '') {
      handlePagination(allImages, 20);
      return;
    } else if (cond1) {
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
            if (!searchBy.albumId) {
              setsearchBy({ id: false, albumId: true });
            } else if (searchBy.id) {
              setsearchBy(clearSearchBy);
            }
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
            if (!searchBy.id) {
              setsearchBy({ id: true, albumId: false });
            } else if (searchBy.id) {
              setsearchBy(clearSearchBy);
            }
          }}
          style={searchBy.id ? { background: 'yellow', color: 'black' } : {}}
        >
          By Id
        </button>
      </div>

      {/* gallery */}

      {/* error modal */}
      {errorModalOpen && !isLoading && (
        <div className="errorModal">
          <h2>Not found</h2>
          <button
            className="btn"
            onClick={() => {
              seterrorModalOpen(false);
              setsearchQuery('');
              handleSearch(allImages, '');
            }}
          >
            Go Back
          </button>
        </div>
      )}

      {isLoading && (
        <div className="errorModal">
          <h2>Loading...</h2>
        </div>
      )}

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
