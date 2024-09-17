import ImageFetcher from '@/view-trip/[tripId]/components/ImageFetcher';
import React from 'react';
import { Link } from 'react-router-dom';

function UserTripCardItem({ trip }) {
  return (
    <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all'>
        <ImageFetcher imageName={trip?.userSelection?.location} className="w-[200px] h-[200px] object-cover rounded-xl" />

        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Day trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
        </div>
    </Link>
  );
}

export default UserTripCardItem;
