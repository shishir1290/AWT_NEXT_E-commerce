import React from 'react'
import Navbar from './navbar'
import Footer from './footer'


export default function Layout({children}) {
  return (
    <>
    <div>
      <Navbar/>
    </div>
    {/* // ekhane amra children call korbo  */}
    <div>
      {children}
    </div>

    <Footer/>
    {/* <div class="container">
      <div class="sm:column-0 md:column-3 lg:column-2 xl:column-2">
      main category
      </div>
      <div class="sm:column-12 md:column-9 lg:column-8 xl:column-8">
    banner 
    search field
    categories
      </div>
      <div class="sm:column-0 md:column-0 lg:column-2 xl:column-2">
      Information
      </div>
    </div> */}

    </>
  )
}
