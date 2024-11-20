import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaGoogle } from "react-icons/fa6";
import axios from "axios";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  
  useEffect(() => {
    if(!user){
      setOpenDialog(true);
    }
  },[])
  

  
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
        setUser(JSON.parse(localStorage.getItem('user')))
        
        setOpenDialog(false);
      });
  };

 
  return (
    <div className="p-2 shadow-md px-5 flex justify-between text-center">
      <a href="/"><img src="/logo.png" alt="" /></a>
      
      <div className="mt-3">
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="md:rounded-full pt-1 ml-2">
                Create trip +
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="md:rounded-full pt-1">
                My trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] min-w-[50px]  xs:w-[35px] md:rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.replace("/");
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
            <h2 className="hidden sm:block font-semibold">Hi, {user?.given_name}</h2>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Sign in with Google</DialogTitle>
            <DialogDescription className="flex flex-col gap-2 items-center text-center justify-center">
              <img src="/logo.png" className=""/>
              {/* <h2 className="font-bold text-lg mt-7">Sign in with Google</h2> */}
              <p>Sign in to the App with Google authentication securely</p>
              <p className="text-red-400">Please Sign in to Continue</p>
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
  );
};

export default Header;
