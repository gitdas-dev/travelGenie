import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && getPlacePhoto();
  }, [trip]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
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
    <Link to={"/view-trip/" + trip?.id}>
      <div className="flex flex-col gap-10 bg-orange-100 rounded-xl p-2 hover:transition-all hover:scale-105 w-[400px] hover:shadow-md">
        <img
          src={photoUrl ? photoUrl : "/placeholder.png"}
          className="object-cover rounded-xl h-[150px] w-[150]"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-900">
            {trip?.userSelection?.noOfDays} days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
