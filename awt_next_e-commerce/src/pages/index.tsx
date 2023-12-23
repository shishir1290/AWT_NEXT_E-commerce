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
    rout = ''; // Fix the typo here, and use single quotes for the string
  }

  useEffect(() => {
    // Redirect to '/manager/home' only if the current route is not '/manager/home'
    if (router.pathname !== '/manager/signin') {
      router.push('/manager/signin');
    }
  }, [router.pathname]); // Run the effect whenever the pathname changes

  return <>{rout}</>;
};

Page.getLayout = function getLayout(page: ReactElement): ReactNode {
  return <Layout>{page}</Layout>;
};

export default Page;
