import React from 'react'
import SingleYoutubeReview from './SingleYoutubeReview'

export default function YoutubeReviews() {
  return (
    <>
    <button className='btn btn-green-500'>Create Youtube Review</button>
    <div className='flex flex-col gap-3'>
    <SingleYoutubeReview/>
    <SingleYoutubeReview/>
    <SingleYoutubeReview/>
    </div>

    
    </>
  )
}
