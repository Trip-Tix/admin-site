import { useState, useEffect } from 'react';

const useAuthentication = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        
        if (token && username) {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated;
}

export default useAuthentication;
