import React from 'react'
import CategoryCard from './categoryCard'

export default function Categories() {
  return (
    <>
      <div className=''>
      {/* border-2 */}
        <div className='flex flex-wrap justify-center content-center gap-3'>
          <CategoryCard categoryName="PC" categoryImage= "src"/>
          <CategoryCard  categoryName="PC" categoryImage= "src"/>
          <CategoryCard  categoryName="PC" categoryImage= "src"/>
          <CategoryCard  categoryName="PC" categoryImage= "src"/>
          <CategoryCard  categoryName="PC" categoryImage= "src"/>
          <CategoryCard  categoryName="PC" categoryImage= "src"/>
          <CategoryCard  categoryName="PC" categoryImage= "src"/>
          <CategoryCard  categoryName="PC" categoryImage= "src" />
          <CategoryCard  categoryName="PC" categoryImage= "src" />
        </div>
      </div>
    </>
  )
}
