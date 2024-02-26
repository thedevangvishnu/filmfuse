import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaDeleteLeft, FaArrowLeft } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";

import useFetchAndCombine from "../../hooks/useFetchAndCombine";
import fetchDataFromApi from "../../utils/api";

import { AppContext } from "../../context/AppContext";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import GenresTab from "../../components/genreTab/GenresTab";
import GenreWiseMediaCard from "../../components/genreWiseMediaCard/GenreWiseMediaCard";
import SearchResultCard from "../../components/searchResultCard/SearchResultCard";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader";

import "./Search.styles.scss";
import BarLoader from "../../components/barLoader/BarLoader";

const Search = () => {
  const [searchPageGenres, setSearchPageGenres] = useState([]);
  const [currentGenreId, setCurrentGenreId] = useState(null);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");

  const { genres } = useContext(AppContext);

  const { data, isLoading } = useFetchAndCombine(currentGenreId);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    populateGenresForSearchPage();
  }, []);

  useEffect(() => {
    if (searchPageGenres.length > 0) {
      setCurrentGenreId(searchPageGenres[0]?.id);
    }
  }, [searchPageGenres]);

  const populateGenresForSearchPage = () => {
    const desiredGenres = [
      "Action",
      "Comedy",
      "Crime",
      "Drama",
      "Romance",
      "Thriller",
      "Documentary",
    ];
    const allGenres = Object.values(genres).filter((genre) =>
      desiredGenres.includes(genre.name)
    );
    setSearchPageGenres(allGenres);
  };

  const handleGoBack = () => {
    if (location.state && location.state.source) {
      navigate(location.state.source);
    } else {
      navigate("/");
    }
  };

  const timeout = useRef();
  const errorMsgTimeout = useRef();

  useEffect(() => {
    setPageNumber(1);
    setSearchData(null);

    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      fetchInitialSearchData();
    }, 200);

    if (searchData?.results?.length === 0) {
      errorMsgTimeout.current = setTimeout(() => {
        setErrorMessage("Sorry, no results found");
      }, 500);
    }

    return () => {
      clearTimeout(timeout.current);
      clearTimeout(errorMsgTimeout.current);
    };
  }, [query]);

  const onSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchInitialSearchData = async () => {
    setSearchData([]);
    setIsSearchLoading(true);
    setSearchError(null);
    try {
      const response = await fetchDataFromApi(`/search/multi`, { query });

      if (response) {
        setSearchData(response);
        setIsSearchLoading(false);
        setSearchError(null);
        setPageNumber((prevPage) => prevPage + 1);
      }
    } catch (error) {
      setSearchData({});
      setIsSearchLoading(false);
      setSearchError(error);
    }
  };

  const fetchSearchDataForNextPage = async () => {
    setSearchError(null);
    try {
      const response = await fetchDataFromApi(`/search/multi`, {
        query,
        page: pageNumber,
      });

      if (searchData) {
        setSearchData({
          ...searchData,
          results: [...searchData?.results, ...response?.results],
        });
      } else {
        setSearchData(response);
      }
      setPageNumber((prevPage) => prevPage + 1);
    } catch (error) {
      setSearchError(error);
    }
  };

  const handleGenreTabClick = (genreId) => {
    setCurrentGenreId(genreId);
  };

  return (
    <div className="searchPage">
      <ContentWrapper>
        <div className="closeIconContainer" onClick={handleGoBack}>
          <FaArrowLeft className="arrowIcon icon" />
        </div>

        {/* search container */}
        <div className="searchContainer">
          <input
            type="text"
            value={query}
            placeholder="Search movies or tv shows"
            onChange={onSearchInputChange}
          />
          <span onClick={() => setQuery("")}>
            {query && <FaDeleteLeft className="clearIcon icon" />}
          </span>
        </div>

        {/* genres tabs */}
        {!query && (
          <div className="genresTabsContainer">
            {searchPageGenres.map((genre) => (
              <GenresTab
                key={genre.id}
                genre={genre.name}
                onTabClick={() => handleGenreTabClick(genre.id)}
              />
            ))}
          </div>
        )}

        {/* genre-wise search result */}
        {isLoading && !query && <BarLoader />}

        {!isLoading && !query && (
          <div className="genreWiseResults">
            {data?.results?.map((item, index) => (
              <GenreWiseMediaCard item={item} gridItem={index + 1} />
            ))}
          </div>
        )}

        {/* query-wise search result */}
        {isSearchLoading && query && <BarLoader />}
        {!isSearchLoading && query && (
          <div className="searchResult">
            {searchData?.results.length === 0 && (
              <p className="errorMessage">{errorMessage}</p>
            )}
            <InfiniteScroll
              className="searchResultCards"
              dataLength={searchData?.results?.length}
              hasMore={pageNumber < searchData?.total_pages}
              loader={<SpinnerLoader />}
              next={fetchSearchDataForNextPage}
            >
              {searchData?.results?.map((item) => {
                return (
                  <SearchResultCard
                    key={item?.id}
                    item={item}
                    // mediaType={mediaType}
                  />
                );
              })}
            </InfiniteScroll>
          </div>

          // <div className="searchResult">
          //   {searchData?.results?.length > 0 ? (
          //     <InfiniteScroll
          //       className="searchResultCards"
          //       dataLength={searchData?.results?.length}
          //       hasMore={pageNumber < searchData?.total_pages}
          //       loader={<SpinnerLoader />}
          //       next={fetchSearchDataForNextPage}
          //     >
          //       {searchData?.results?.map((item) => {
          //         return (
          //           <SearchResultCard
          //             key={item?.id}
          //             item={item}
          //             // mediaType={mediaType}
          //           />
          //         );
          //       })}
          //     </InfiniteScroll>
          //   ) : (
          //     <p>{errorMessage}</p>
          //   )}
          // </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Search;
