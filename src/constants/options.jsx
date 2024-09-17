export const SelectTravelersList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler exploring the world',
      icon: '🧳',
      people: '1'
    },
    {
      id: 2,
      title: 'A Couple',
      desc: 'Two people sharing an adventure',
      icon: '🫂',
      people: '2'
    },
    {
      id: 3,
      title: 'Trio',
      desc: 'A group of 3 Muskeeters',
      icon: '👨‍👧‍👧',
      people: '3'
    },
    {
      id: 4,
      title: 'Family',
      desc: 'A family traveling together',
      icon: '👨‍👩‍👧‍👦',
      people: '4'
    },
    {
      id: 5,
      title: 'Group of Friends',
      desc: 'A group of friends on a fun trip',
      icon: '👯‍♂️',
      people: '5+'
    }
];

export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💸'
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'Comfortable yet affordable',
      icon: '💰'
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'High-end experiences',
      icon: '💎'
    }
];

export const AI_PROMPT="Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} people with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format."