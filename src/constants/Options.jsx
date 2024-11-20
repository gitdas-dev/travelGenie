


export const SelectTravelsList = [
    {
        id: 1,
        title: "Just me",
        desc: "A solo travel in exploration",
        icon: "✈",
        people: 1
    },
    {
        id: 2,
        title: "A Couple",
        desc: "2 people travelling and get tanned together",
        icon: "🥂",
        people: '2 People'
    },
    {
        id: 3,
        title: "Family",
        desc: "A group of family who loves adventure",
        icon: "🏠",
        people: '3 to 5 People'
    }

]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: '💵'
    },
    {
        id: 2,
        title: "Moderate",
        desc: "Keep const on the average side",
        icon: '💰'
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Don't worry about money",
        icon: '💸'
    }
]

export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {noOfDays} Days for {noOfPeople} with a {budget} budget, give me more than 2 Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {noOfDays} with each day plan with best time(in the format 9:00 PM - 12:00 PM) to visit the locations, time to travel to the location in JSON format'