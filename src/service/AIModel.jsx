import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with Hotelname, Hotel address, Price, Hotel Image Url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
    "hotels": [
        {
            "hotelName": "The LINQ Hotel + Experience",
            "hotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109",
            "price": "$75 per night",
            "hotelImageUrl": "https://example.com/linq_hotel.jpg",
            "geoCoordinates": {
                "latitude": 36.1169,
                "longitude": -115.1693
            },
            "rating": 4.2,
            "description": "A budget-friendly hotel located at the center of the Las Vegas Strip, offering modern rooms and a lively atmosphere."
        },
        {
            "hotelName": "Excalibur Hotel & Casino",
            "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109",
            "price": "$60 per night",
            "hotelImageUrl": "https://example.com/excalibur_hotel.jpg",
            "geoCoordinates": {
                "latitude": 36.0986,
                "longitude": -115.1761
            },
            "rating": 3.9,
            "description": "A medieval-themed hotel and casino with budget-friendly rates, located on the Strip and close to popular attractions."
        }
    ],
    "itinerary": [
        {
            "day": 1,
            "plan": [
                {
                    "placeName": "The Fountains of Bellagio",
                    "placeDetails": "A mesmerizing water and light show that takes place every half hour.",
                    "placeImageUrl": "https://example.com/bellagio_fountains.jpg",
                    "geoCoordinates": {
                        "latitude": 36.1126,
                        "longitude": -115.1765
                    },
                    "ticketPricing": "Free",
                    "rating": 4.8,
                    "bestTimeToVisit": "Evening",
                    "travelTime": "15 mins from hotel"
                },
                {
                    "placeName": "Freemont Street Experience",
                    "placeDetails": "An iconic street offering vibrant lights, live music, and street performances.",
                    "placeImageUrl": "https://example.com/freemont_street.jpg",
                    "geoCoordinates": {
                        "latitude": 36.1699,
                        "longitude": -115.1445
                    },
                    "ticketPricing": "Free",
                    "rating": 4.6,
                    "bestTimeToVisit": "Night",
                    "travelTime": "20 mins from hotel"
                }
            ]
        },
        {
            "day": 2,
            "plan": [
                {
                    "placeName": "High Roller Observation Wheel",
                    "placeDetails": "A 30-minute ride on the world’s tallest observation wheel.",
                    "placeImageUrl": "https://example.com/high_roller.jpg",
                    "geoCoordinates": {
                        "latitude": 36.1175,
                        "longitude": -115.1687
                    },
                    "ticketPricing": "$30 per person",
                    "rating": 4.7,
                    "bestTimeToVisit": "Sunset",
                    "travelTime": "10 mins from hotel"
                },
                {
                    "placeName": "Neon Museum",
                    "placeDetails": "An outdoor museum with restored neon signs from Las Vegas’s past.",
                    "placeImageUrl": "https://example.com/neon_museum.jpg",
                    "geoCoordinates": {
                        "latitude": 36.1768,
                        "longitude": -115.1366
                    },
                    "ticketPricing": "$20 per person",
                    "rating": 4.5,
                    "bestTimeToVisit": "Afternoon",
                    "travelTime": "15 mins from hotel"
                }
            ]
        },
        {
            "day": 3,
            "plan": [
                {
                    "placeName": "Red Rock Canyon National Conservation Area",
                    "placeDetails": "Scenic red rock formations, hiking trails, and picnic areas.",
                    "placeImageUrl": "https://example.com/red_rock_canyon.jpg",
                    "geoCoordinates": {
                        "latitude": 36.1595,
                        "longitude": -115.4442
                    },
                    "ticketPricing": "$15 per vehicle",
                    "rating": 4.8,
                    "bestTimeToVisit": "Morning",
                    "travelTime": "25 mins from hotel"
                },
                {
                    "placeName": "The Mirage Volcano",
                    "placeDetails": "A free volcano show with fire and music, located at The Mirage hotel.",
                    "placeImageUrl": "https://example.com/mirage_volcano.jpg",
                    "geoCoordinates": {
                        "latitude": 36.1218,
                        "longitude": -115.1745
                    },
                    "ticketPricing": "Free",
                    "rating": 4.6,
                    "bestTimeToVisit": "Night",
                    "travelTime": "15 mins from hotel"
                }
            ]
        }
    ]
}`,
        },
      ],
    },
  ],
});
