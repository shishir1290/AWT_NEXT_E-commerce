import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const DropdownMenu = ({ title, links }: { title: string; links: Array<{ url: string; label: string }> }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <li className="hs-accordion" id={`${title.toLowerCase()}-accordion`}>
      <button
        type="button"
        className="hs-accordion-toggle hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={toggleDropdown}
      >
        {title}
        <svg
          className={`ms-auto w-4 h-4 text-gray-600 group-hover:text-gray-500 dark:text-gray-400 ${
            !isDropdownOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id={`${title.toLowerCase()}-accordion`}
        className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
          isDropdownOpen ? "" : "hidden"
        }`}
      >
        <ul className="pt-2 ps-2">
          {links.map((link: { url: string; label: string }, index: number) => (
            <li key={index}>
              <Link
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-black dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href={link.url}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoryLinks, setCategoryLinks] = useState<Array<{ url: string; label: string }>>([]);
  const [brandLinks, setBrandLinks] = useState<Array<{ url: string; label: string }>>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const closeSidebarOnOutsideClick = (e: any) => {
      if (
        isSidebarOpen &&
        !e.target.closest(".hs-overlay") &&
        e.target.getAttribute("aria-label") !== "Toggle navigation"
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", closeSidebarOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get("http://localhost:3000/category");

        if (categoryRes.data.length > 0) {
          const categoryData = categoryRes.data;
          const categoryLinksData = categoryData.map((category:any) => ({
            label: category.CategoryName,
            url: `/products/searchResultByCategory/${category.categoryId}`,
          }));
          setCategoryLinks(categoryLinksData);
          
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const brandRes = await axios.get("http://localhost:3000/brand");
        

        if (brandRes.data.length > 0) {
          const brandData = brandRes.data;
          const brandLinksData = brandData.map((brand:any) => ({
            label: brand.BrandName,
            url: `/products/searchResultByBrand/${brand.brandId}`,
          }));
          setBrandLinks(brandLinksData);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []); // Fetch categories on component mount



  const dropdownData = [
    {
      title: "Categorys",
      links: categoryLinks,
    },
    {
      title: 'Brands',
      links: brandLinks,
    },
    // Add more dropdown items as needed
  ];

  return (
    <div className="sticky top-20 w-2/3 z-50">
      {/* Navigation Toggle */}
      <button
        type="button"
        className="text-gray-500 hover:text-gray-600 font-bold text-2xl"
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      {/* End Navigation Toggle */}

      {/* Sidebar */}
      <div
        className={`hs-overlay transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } dark:[&::-webkit-scrollbar]:w-2 dark:[&::-webkit-scrollbar-thumb]:rounded-full dark:[&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="px-6">
          <a href="/buyer/home" className="flex flex-wrap items-center">
            <img
              src="https://i.ibb.co/sCxv3Td/Logo.png"
              width={35}
              height={35}
              alt="Picture of the author"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white ml-2">
              E-commerce
            </span>
          </a>
        </div>
        {/* Navigation Links */}
        <nav
          className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
          data-hs-accordion-always-open
        >
          <ul className="space-y-1.5">
            {dropdownData.map((dropdown, index) => (
              <DropdownMenu key={index} title={dropdown.title} links={dropdown.links} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
