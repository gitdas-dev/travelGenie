import React from "react";
import PlaceCardItem from "./PlaceCardItem";



function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 text-gray-700">Places to Visit</h2>
      <div className="my-5">
        {trip?.tripData?.itinerary.map((item, index) => (
          <div key={index}>
            <div>
              <h2 className="font-medium text-lg">Day {item?.day}</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 my-4">
                {item?.plan?.map((place, index) => (
                  <div key={index}>
                    <h2 className="font-medium text-sm text-green-800">
                      {place.bestTimeToVisit}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
