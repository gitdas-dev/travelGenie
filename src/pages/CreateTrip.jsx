import { Button } from "@/components/ui/button";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/Options";
import { chatSession } from "@/service/AIModel";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "@/view-trip/components/Footer";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.traveler ||
      !formData?.budget
    ) {
      toast("Please fill all the required details!");
      return;
    }

    setLoading(true);

    console.log(formData);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{noOfDays}", formData?.noOfDays)
      .replace("{budget}", formData?.budget)
      .replace("{noOfPeople}", formData?.traveler)
      .replace("{noOfDays}", formData?.noOfDays);
    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    
    setLoading(false);
    saveTrip(result?.response?.text());
    
    
  };

  const saveTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user.email,
      id: docId,
    });
   

    setLoading(false);
    navigate('/view-trip/' + docId);
  };

  return (
    <div className="sm:px-14 md:px-32 lg:px-56 xl:px-72 px-12 mt-10">
      <h2 className="font-bold text-3xl">
        Please provide your travel preferences 🧳✈️
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Please share a few details, and our trip planner will create a
        personalized itinerary tailored to your interests.
      </p>
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="font-medium text-xl my-3">
            Search and select your destination of choice.
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              placeholder:
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning the trip for?
            
          </h2>
          <Input
            placeholder={"Ex. 4"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">What is your budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 flex flex-col gap-2 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget === item.title &&
                  "shadow-lg border-blue-900  bg-gray-200"
                }`}
                onClick={(e) => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-xs md:text-lg">{item.title}</h2>
                <h2 className="text-xs md:text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium my-3">
            Who do you plan to travel with in your next journey?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border flex flex-col gap-2 hover:shadow-lg rounded-lg cursor-pointer ${
                  formData?.traveler === item.people &&
                  "shadow-lg border-black bg-gray-200"
                }`}
                onClick={(e) => handleInputChange("traveler", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-xs md:text-lg">{item.title}</h2>
                <h2 className="text-xs md:text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate trip"
          )}
        </Button>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign in with Google</DialogTitle>
              <DialogDescription>
                <img src="/logo.svg" />
                {/* <h2 className="font-bold text-lg mt-7">Sign in with Google</h2> */}
                <p>Sign in to the App with Google authentication securely</p>
                <Button
                  className="w-full mt-5 flex gap-4 items-center"
                  onClick={login}
                  disabled={loading}
                >
                  <FaGoogle className="h-7 w-7" />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default CreateTrip;
