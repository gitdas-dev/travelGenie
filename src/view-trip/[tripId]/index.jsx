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
    
    tripId&&getTripData()
  }, [tripId])


  const getTripData = async () => {
    
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data())
    } else {
      console.log("No such document!");
    }

  };
  return <div className="p-10 md:px-20 lg:px-44 xl:px-56">
    {/* Information section */}
    <InfoSection trip={trip}/>
    {/* Recommended hotels */}
    <Hotels trip={trip}/>
    {/* Daily iterinary */}
    <PlacesToVisit trip={trip}/>
    {/* Footer */}
    <Footer />
  </div>;
}

export default ViewTrip;
