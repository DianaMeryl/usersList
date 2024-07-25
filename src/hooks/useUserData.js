import { useState, useEffect } from 'react';


function useUserData() {
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [users, setUsers] = useState([]);

useEffect(() => {
    async function fetchData() {
    try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    setUsers(data);
    setLoading(false);
    } catch (error) {
    setError(error);
    setLoading(false);
    }
}
fetchData();
}, []);
return { loading, error, users};
}

export default useUserData;
