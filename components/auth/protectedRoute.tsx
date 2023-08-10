// hoc/withAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();

    useEffect(() => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
  
      const userIsAuthenticated = username && token;

      if (!userIsAuthenticated) {
        router.push('/user/login');
      }
    }, [router]);

    return <Component {...props} />;
  };
}
