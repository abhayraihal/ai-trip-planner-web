import { Button } from '@/components/ui/button';
import React from 'react'
import { ImShare2 } from "react-icons/im";
import ImageFetcher from './ImageFetcher';

function InfoSection({trip}) {
  return (
    <div>
        {/* <img src='/placeholder.jpg' className='h-[300px] w-full object-cover rounded-xl'/> */}
        <div className='grid grid-cols-3'>
          <ImageFetcher imageName={trip?.userSelection?.location} className="w-[300px] h-[300px] object-cover rounded-xl" />
          <ImageFetcher imageName={trip?.userSelection?.location} className="w-[300px] h-[300px] object-cover rounded-xl" />
          <ImageFetcher imageName={trip?.userSelection?.location} className="w-[300px] h-[300px] object-cover rounded-xl" />
        </div>
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bol text-2xl'>{trip?.userSelection?.location}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Days </h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget </h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No of Traveller: {trip?.userSelection?.traveler} People</h2>
                </div>
            </div>
            <Button> <ImShare2/> </Button>
        </div>
    </div>
  )
}

export default InfoSection