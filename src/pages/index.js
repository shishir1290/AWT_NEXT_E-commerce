import Image from 'next/image'
// import { Inter } from 'next/font/google'

import Layout from '@/layout/layout'
import MainCategory from '@/layout/mainCategory'
import Banner from '@/component/home/Banner'
import SearchField from '@/component/home/SearchField'
import Categories from '@/component/common/category/categories'
import Products from '@/component/common/product/products'


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className=' relative'>
      {/* min-h-[300vh] */}
        <div className=" grid grid-cols-12 ">
            <div class="col-span-3 lg:col-span-3 flex justify-start xxl:justify-end">
                <div className='pt-[70px] '>
              <MainCategory style="lg:w-[220px]"/>
                </div>
            </div>
            
            <div className="col-span-9 lg:col-span-6  ">
              <div className='pt-[70px] '>
                <Banner/>
              </div>
                
              <div class='pt-[10px] '>
                  <SearchField/>
              </div>
              
              
              <div class='pt-[10px] '>
                  <Categories/>
              </div>
              


            </div>
            
            <div class="hidden lg:block lg:col-span-3  ">
                <div className='pt-[70px] '>
              <MainCategory/>
            </div>
        </div> 

            
        </div>
        <div className=' mx-auto'>
        {/* container 🟢🔰🔴🔗⚫ ekhane kaj korte hobe */}
          {/* // ekhane amra product gula show korbo  */}
            <Products  brandName="PC"/>
            <Products  brandName="Router"/>
        </div>

        
      </div>
      
    </>
  )
}

{/*
            2xl:px-[30%] -> normal -> 100% 
            xl:px-[25%] -> 120% - 150% 
            lg:px-[20%] ->  160px - 180% - 230% 
            md:px-[10%]
            sm:px-[1%] -> */}