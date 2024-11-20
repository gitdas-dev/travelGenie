import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  return (
    <>
      {trip ? (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
          {/* Information section */}
          <InfoSection trip={trip} />
          {/* Recommended hotels */}
          <Hotels trip={trip} />
          {/* Daily iterinary */}
          <PlacesToVisit trip={trip} />
          {/* Footer */}
          <Footer />
        </div>
      ) : (
        [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div
            key={index}
            className="h-[250px] w-[500px] bg-orange-200 animate-pulse rounded-xl"
          ></div>
        ))
      )}
    </>
  );
}

export default ViewTrip;
