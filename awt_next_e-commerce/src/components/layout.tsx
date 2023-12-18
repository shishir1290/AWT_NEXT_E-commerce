import React, { useState, useEffect } from 'react';
import Navbar, { NavbarProps } from './navbar';
import Footer from './footer';
import Sidebar from './sidebar';

interface NavigationData {
  links: NavbarProps['links'];
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [navigationData, setNavigationData] = useState<NavigationData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/navigation');
        if (!response.ok) {
          throw new Error('Failed to fetch navigation data');
        }
        const data: NavigationData = await response.json();
        setNavigationData(data);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar links={navigationData?.links || []} />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
