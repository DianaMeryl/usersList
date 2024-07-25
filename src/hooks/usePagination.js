import { useState, useEffect } from 'react';

const usePagination = (initialState) => {

  const { itemsPerPage, users, startFrom } = initialState;
  const [searching, setSearching] = useState(false);
  const [filteredData, setFilteredData] = useState(users);

  const perPage = itemsPerPage ? itemsPerPage : 10;
  const pages = Math.ceil(users.length / perPage);

  const pagination = [];
  const [currentPage, setCurrentPage] = useState(startFrom <= pages ? startFrom : 1);

  const [slicedData, setSlicedData] = useState([...users].slice((currentPage - 1) * perPage, currentPage * perPage));

  useEffect(() => {
    
    setSlicedData([...filteredData].slice((currentPage - 1) * perPage, currentPage * perPage));
    if(searching) {
      setCurrentPage(1);
      setSearching(false);
    }
    // eslint-disable-next-line
  }, [filteredData, currentPage]);

  let marksLeft = false;
  let marksRight = false;

  for(let i = 1; i <= pages; i++) {
    if(i === currentPage) {
      pagination.push(
        { id: i, current: true, marks: false }
      );
    }else {
      if(i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1) {
        pagination.push(
          { id: i, current: false, marks: false }
        );
      }else if(i > 1 && i < currentPage && !marksLeft) {
        pagination.push(
          { id: i, current: false, marks: true }
        );
        marksLeft = true;
      }else if(i < pages && i > currentPage && !marksRight) {
        pagination.push(
          { id: i, current: false, marks: true }
        );
        marksRight = true;
      } 
    }
  }

  const changePage = (page, e) => {
    e.preventDefault();
    if(page !== currentPage) {
      setCurrentPage(page);
      setSlicedData([...filteredData].slice((page - 1) * perPage, page * perPage));
    }
  }

  const goToPrevPage = (e) => {
    e.preventDefault();
    setCurrentPage(prevVal => prevVal - 1 === 0 ? prevVal : prevVal - 1);
    if(currentPage !== 1) {
      setSlicedData([...filteredData].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage));
    }
  }

  const goToNextPage = (e) => {
    e.preventDefault();
    setCurrentPage(prevVal => prevVal === pages ? prevVal : prevVal + 1);
    if(currentPage !== pages) {
      setSlicedData([...filteredData].slice(currentPage * perPage, (currentPage + 1) * perPage));
    }
  }

  return {
    slicedData,
    pagination,
    prevPage: goToPrevPage,
    nextPage: goToNextPage,
    changePage,
    setFilteredData,
    setSearching
  }
}

export default usePagination;