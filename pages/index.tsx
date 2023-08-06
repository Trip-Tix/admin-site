import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  // Redirect to "/user/login"
  if (typeof window !== 'undefined') {
    router.push('/user/login');
  }

  return (
    <h1>Welcome</h1>
  );
}
