import React from 'react';
import useSWR, { SWRResponse } from 'swr';
import Navbar, { NavbarProps } from './navbar';
import Footer from './footer';

interface NavigationData {
  links: NavbarProps['links']; // Use the same type as in NavbarProps
}

interface LayoutProps {
  children: React.ReactNode;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data, error }: SWRResponse<NavigationData, Error> = useSWR('/api/navigation', fetcher);

  return (
    <>
      <Navbar links={data?.links || []} />
      
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
