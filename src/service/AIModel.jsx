import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a cheap budget, give me a Hotels options list with HotelName, HotelAddress, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, placeDetails, place image url, geo coordinates, ticket pricing, rating, time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50 - $100 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/4000000/3980000/3978100/3978085/3978085_100_b.jpg\",\n      \"geoCoordinates\": \"36.1699, -115.1422\",\n      \"rating\": 4.0,\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street Experience, known for its vibrant atmosphere and live entertainment.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$70 - $150 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/1000000/900000/894000/894300/894300_100_b.jpg\",\n      \"geoCoordinates\": \"36.1695, -115.1405\",\n      \"rating\": 4.5,\n      \"description\": \"A historic hotel with a modern twist, offering a unique pool experience and exciting casino action.\"\n    },\n    {\n      \"hotelName\": \"Plaza Hotel & Casino\",\n      \"hotelAddress\": \"1 Main St, Las Vegas, NV 89101\",\n      \"price\": \"$60 - $120 per night\",\n      \"hotelImageUrl\": \"https://images.trvl-media.com/hotels/4000000/3980000/3979000/3979900/3979900_100_b.jpg\",\n      \"geoCoordinates\": \"36.1696, -115.1399\",\n      \"rating\": 4.0,\n      \"description\": \"A classic hotel located in the heart of Fremont Street, offering a lively atmosphere and affordable amenities.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": 1,\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"Walk the iconic pedestrian mall, experience the Viva Vision light show, and enjoy street performers and live music.\",\n          \"placeImageUrl\": \"https://www.lasvegasnevada.com/media/images/freemont-street-experience-las-vegas.jpg\",\n          \"geoCoordinates\": \"36.1691, -115.1416\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Afternoon (2pm - 6pm)\"\n        },\n        {\n          \"placeName\": \"The Mob Museum\",\n          \"placeDetails\": \"Learn about the history of organized crime in Las Vegas, featuring exhibits, artifacts, and interactive displays.\",\n          \"placeImageUrl\": \"https://www.themobmuseum.org/media/images/featured/mob-museum-exterior-1920x1080.jpg\",\n          \"geoCoordinates\": \"36.1689, -115.1441\",\n          \"ticketPricing\": \"$25 - $30 per person\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"Evening (7pm - 9pm)\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"plan\": [\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"Admire the breathtaking floral displays and sculptures, changing seasonally with themed designs.\",\n          \"placeImageUrl\": \"https://media.timeout.com/images/105564006/image.jpg\",\n          \"geoCoordinates\": \"36.1101, -115.1721\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Morning (10am - 12pm)\"\n        },\n        {\n          \"placeName\": \"The Strip\",\n          \"placeDetails\": \"Explore the iconic Las Vegas Boulevard, visit casinos, admire the architectural wonders, and enjoy street entertainment.\",\n          \"placeImageUrl\": \"https://www.lasvegasnevada.com/media/images/las-vegas-strip.jpg\",\n          \"geoCoordinates\": \"36.1145, -115.1735\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": 5.0,\n          \"timeTravel\": \"Afternoon (2pm - 6pm)\"\n        }\n      ]\n    },\n    {\n      \"day\": 3,\n      \"plan\": [\n        {\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"See a collection of vintage neon signs from Las Vegas's past, housed in a museum and outdoor exhibit.\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/sites/default/files/styles/hero_image/public/images/content/2019/05/neon-museum-las-vegas.jpg\",\n          \"geoCoordinates\": \"36.1838, -115.1366\",\n          \"ticketPricing\": \"$20 - $25 per person\",\n          \"rating\": 4.0,\n          \"timeTravel\": \"Morning (9am - 11am)\"\n        },\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"Enjoy scenic drives, hiking trails, and breathtaking views of the red rock formations.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/learn/nature/images/red-rock-canyon-1.jpg\",\n          \"geoCoordinates\": \"36.1358, -115.2399\",\n          \"ticketPricing\": \"$15 per vehicle\",\n          \"rating\": 4.5,\n          \"timeTravel\": \"Afternoon (1pm - 5pm)\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Explanation:**\n\n* **hotelOptions:** Provides a list of three budget-friendly hotels in Las Vegas with essential information like name, address, price range, image URL, coordinates, rating, and a brief description.\n* **itinerary:** Offers a three-day itinerary with suggested places to visit, details, image URLs, coordinates, ticket pricing, ratings, and the best time to visit each place.\n* **Day 1:** Focuses on exploring the downtown area with Fremont Street Experience, offering a vibrant atmosphere, and the Mob Museum, providing insights into Las Vegas's history.\n* **Day 2:** Explores the Strip with a visit to the Bellagio Conservatory and Botanical Garden, known for its stunning floral displays, and a walk along the Strip, offering an iconic Las Vegas experience.\n* **Day 3:** Offers a more relaxed experience with a visit to the Neon Museum, showcasing vintage neon signs, and a trip to Red Rock Canyon National Conservation Area for scenic drives and hiking.\n\n**Notes:**\n\n* This itinerary prioritizes free or affordable attractions and activities to keep the budget low.\n* Times can be adjusted based on your preferences and the time of year.\n* Consider exploring local food options and street food for budget-friendly dining.\n* Remember to check for any special events or promotions happening during your trip.\n* Research transportation options (public transportation, rideshare, or walking) to minimize costs.\n* Always check the latest information on ticket prices and opening hours before your visit. \n"},
          ],
        },
      ],
    });