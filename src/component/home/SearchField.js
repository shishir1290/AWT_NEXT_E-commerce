

import React from 'react'

function SearchField() {
  return (
    <>
    <div className="border-solid  overflow-hidden">
    {/* border-2 */}
    
        <form class="flex justify-center content-center" role="search">
            
            <input className='rounded-lg w-56  text-orange-800' type='search' placeholder='Search'/>
            {/* text-orange-800 🔰🔗⚫ text er color set korte hobe  */}
            <button type="submit" className='border-2 rounded-lg ml-3 p-1'>Search</button>
        </form>


    </div>
    
    
    </>
  )
}

export default SearchField