import React from 'react';
import Image from 'next/image';
import LoginComponent from '../components/login';

export default function Home() {
  return (
    <div>
      <div>
        <Image
          src="/images/HomePageImage.jpeg"
          alt="Image Description"
          width={400}
          height={300}
        />
      </div>
      <div>
        <LoginComponent />
      </div>
    </div>
  );
}
