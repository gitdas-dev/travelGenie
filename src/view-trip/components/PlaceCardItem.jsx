import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && getPlacePhoto();
  }, [place]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    await GetPlaceDetails(data).then((resp) => {
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );

      setPhotoUrl(photoUrl);
    });
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer bg-blue-50">
        <img
          src={photoUrl ? photoUrl : "/placeholder.png"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-sm">{place.placeDetails}</p>
          <h2>⏰{place.travelTime}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
