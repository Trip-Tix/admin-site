import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { dashboard_url, login_url, signup_url } from '@public/commonData/PageLinks';

export default function withAuth(WrappedComponent) {
  return function WithAuthWrapper(props) {
    const router = useRouter();
    const [isLogged, setIsLogged] = useState(false);

    const checkAuth = () => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      const userIsAuthenticated = username && token;

      if (!userIsAuthenticated && router.pathname !== login_url && router.pathname !== signup_url) {
        setIsLogged(false);
        router.push(login_url);
      } else if(userIsAuthenticated && (router.pathname === login_url || router.pathname === signup_url)) {
        setIsLogged(true);
        router.push(dashboard_url);
      }
      else {
        setIsLogged(true);
      }
    };

    useEffect(() => {
      checkAuth();
    },);

    if (!isLogged) {
      return null;
    }

    if (isLogged && (router.pathname === login_url || router.pathname === signup_url)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
