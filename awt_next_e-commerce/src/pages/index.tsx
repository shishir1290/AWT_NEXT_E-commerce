import type { ReactElement, ReactNode } from 'react';
import Layout from '../components/layout';
import type { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  let rout: string;

  if (router.query) {
    rout = JSON.stringify(router.query);
  } else {
    rout = 'buyer/home'; // Fix the typo here, and use single quotes for the string
  }

  useEffect(() => {
    // Redirect to '/buyer/home' only if the current route is not '/buyer/home'
    if (router.pathname !== '/buyer/home') {
      router.push('/buyer/home');
    }
  }, [router.pathname]); // Run the effect whenever the pathname changes

  return <>{rout}</>;
};

Page.getLayout = function getLayout(page: ReactElement): ReactNode {
  return <Layout>{page}</Layout>;
};

export default Page;
