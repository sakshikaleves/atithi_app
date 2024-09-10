// pages/index.js
'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/Login');
  }, []);

  return null; // or a loading spinner if you want to show something while redirecting
}
