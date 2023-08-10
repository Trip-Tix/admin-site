// hoc/withAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuthentication from '../../utils/auth';

export default function withAuth(Component) {
  return function ProtectedRoute({ ...props }) {
    const router = useRouter();
    const userIsAuthenticated = useAuthentication();

    useEffect(() => {
      if (!userIsAuthenticated) {
        router.push('/user/login');
      }
    }, [userIsAuthenticated, router]);

    return <Component {...props} />;
  };
}
