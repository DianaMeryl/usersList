import { useState, useEffect } from 'react';

function useSearch(users, setSearching, setFilteredData ) {

const [search, setSearch] = useState('');
const [isVisible, setIsVisible] = useState(false);
const [sortByKey, setSortByKey] = useState('name');
const [order, setOrder] = useState('asc');

const sortData = (dataToSort, sortBy, orderBy) => {

    const filtered = dataToSort.sort((a, b) => {
        if(orderBy === 'asc') {
        if(a[sortBy] < b[sortBy]) {
            return -1;
        }else if(a[sortBy] > b[sortBy]) {
            return 1;
        }else {
            return 0;
        }
        }
        else {
        if(b[sortBy] < a[sortBy]) {
            return -1;
        }else if(b[sortBy] > a[sortBy]) {
            return 1;
        }else {
            return 0;
        }
        }
    });
    return filtered;
    }
    const sortHandler = (sortBy, orderBy) => {
        if(sortByKey !== sortBy) {
            setSortByKey(sortBy);
        }
        if(order !== orderBy) {
            setOrder(orderBy);
        }
        const copyOfData = [...users];
        const filtered = sortData(copyOfData, sortBy, orderBy);
        setFilteredData(filtered);
    }
    

const submitHandler = (e) => {
    e.preventDefault();
    if(search.trim() !== '') {
    setSearching(true);
    const copiedData = [...users];
    const filtered = copiedData.filter(user => {
    return user["name"].toLowerCase().includes(search.trim().toLowerCase());
    });
    const copyOfFilteredData = [...filtered];
    const sortFiltered = sortData(copyOfFilteredData, sortByKey, order);
    setFilteredData(sortFiltered);
    }else {
    const sortFiltered = sortData(users, sortByKey, order);
    setFilteredData(sortFiltered);
    }
    setIsVisible(true);
    setSearch("");
    
}

const BackBtnHandler = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
    setFilteredData(users);
}

return {
    search,
    setSearch,
    submitEvent: submitHandler,
    BackBtnHandler: BackBtnHandler,
    isVisible,
    sortHandler: sortHandler,
    sortByKey,
    order
}

}

export default useSearch;


























// function useSearch(users, search) {
//     const [filteredUsers, setFilteredUsers] = useState([]);
    
//     useEffect(() => {
//     if (!search) {
//         setFilteredUsers(users);
//         return;
//     }
    
//     const lowerCaseSearchQuery = search.toLowerCase();
//     const filtered = users.filter(user =>
//         user.name.toLowerCase().includes(lowerCaseSearchQuery)
//     );
//     setFilteredUsers(filtered);
//     }, [users, search]);
    
//     return filteredUsers;
//     }
    
//     export default useSearch;
    