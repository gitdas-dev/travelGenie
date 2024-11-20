import { Button } from "@/components/ui/button";
import { db } from "@/service/firebaseConfig";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();
  const navigate = useNavigate();
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
  const { tripId } = useParams();


  const deleteTrip = async (docId) => {
    
  
    try {
      await deleteDoc(doc(db, "AITrips", docId));
      navigate("/my-trips");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div>
      <img
        className="h-[340px] w-full object-cover rounded-xl"
        src={photoUrl ? photoUrl : "/placeholder.png"}
      />

      <div className="flex flex-col md:justify-between justify-center items-center md:flex-row">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-xl mb-5">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-3  lg:bg-gray-200 rounded-full text-gray-500 font-semibold text-xs md:text-lg text-center">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-3 lg:bg-gray-200 rounded-full text-gray-500 font-semibold text-xs md:text-lg text-center">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-3 lg:bg-gray-200 rounded-full text-gray-500 font-semibold text-xs md:text-lg text-center">
              🥂 {trip?.userSelection?.traveler} Persons
            </h2>
          </div>
        </div>
        <span className="md:mt-14 rounded-full">
          <Button
            onClick={() => deleteTrip(tripId)}
            variant="destructive"
            className="rounded-full text-xs ml- md:text-lg "
          >
            Delete trip
          </Button>
        </span>
      </div>
    </div>
  );
}

export default InfoSection;
