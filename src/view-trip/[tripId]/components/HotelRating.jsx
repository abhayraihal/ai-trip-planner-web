import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Using react-icons for star icons

function StarRating({ rating }) {
    const fullStars = Math.floor(rating); // Full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check for half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
        <div className='flex items-center'>
            {/* Render full stars */}
            {Array(fullStars).fill(0).map((_, index) => (
                <FaStar key={index} className='text-yellow-500' />
            ))}
            
            {/* Render half star if applicable */}
            {hasHalfStar && <FaStarHalfAlt className='text-yellow-500' />}
            
            {/* Render empty stars */}
            {Array(emptyStars).fill(0).map((_, index) => (
                <FaRegStar key={index} className='text-yellow-500' />
            ))}
        </div>
    );
}

function HotelRating({ hotel }) {
    return (
        <h2 className='text-sm flex flex-row gap-2'>
            <StarRating rating={hotel?.rating || 0} />
            {hotel?.rating || 0}
        </h2>
    );
}

export default HotelRating;
