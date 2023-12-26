import React from 'react'
// import Specification from './Specification'

export default function SpecificationCategory({specificaitonCategory}) {
    const {specificationCategoryId, specificationCategoryName,specificationCategory } = specificaitonCategory;
  return (
    <>
    <div style={{width:"800px"}} className=' mx-auto my-4 flex'>
    {/* border-2 */}
        <div style={{minWidth:"100px"}}>
        {/* Specification Category name */}
        {specificationCategoryName}
        </div>
    
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
            {
                specificationCategory?.map((specification) => {
                    return (
                        <tr class="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" style={{minWidth:"200px"}} class=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            {specification.title}
                            </th>
                            <td class="px-6 py-4">
                            {specification.details}
                            </td>
                        </tr>
                    )
                })
            }
            
            {/* <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Apple MacBook Pro 18"
                </th>
                <td class="px-6 py-4">
                    Silv
                </td>
            </tr> */}
        </tbody>
    </table>
    </div>
    </div>
    </>
  )
}




{/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Details
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silverkjdocdsjcomsocdsocim
                </td>
            </tr>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    Apple MacBook Pro 18"
                </th>
                <td class="px-6 py-4">
                    Silv
                </td>
            </tr>
        </tbody>
    </table>
    </div> */}