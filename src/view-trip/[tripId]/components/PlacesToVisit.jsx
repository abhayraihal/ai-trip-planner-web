import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-lg'>Places to Visit</h2>

      <div>
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={`itinerary-${index}`} className='mt-5'> {/* Add unique key */}
            <h2 className='font-medium text-lg'>Day : {item.day}</h2>
            <div className='grid md:grid-cols-2 gap-5'>
              {item.plan.map((place, index) => (
                <div key={`plan-${index}`} className=''>
                  <h2 className='font-medium text-sm text-orange-600'>{place.timeTravel}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
