"use client";
import ProfileData from "@/app/components/crafter/ProfileData";
import { ProfileForm } from "@/app/components/crafter/ProfileForm";
import { Button } from "@/components/ui/button";
import { Crafter } from "@/lib/types";
import { SignIn, useAuth } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [profileData, setProfileData] = useState(null);
  const { userId } = useAuth();
  const emptyDefaultValues: Crafter = {
    id: "",
    name: "",
    bio: "",
    domain: "",
    contact: "",
    location: "",
    reviews: [],
  };

  useEffect(() => {
    async function fetchProfile() {
      const response = await axios.get(`/api/crafter/profile?id=${userId}`);
      setProfileData(response.data);
    }
    fetchProfile();
  }, []);
  console.log(userId, profileData);
  return (
    <div>
      {userId ? (
        profileData == null ? (
          <div>
            <h1 className="text-center">Create Profile </h1>
            <ProfileForm
              initialProfileData={emptyDefaultValues}
              update={false}
            />
          </div>
        ) : (
          <div>
            <p className="text-center">Your Profile</p>
            <ProfileData />
          </div>
        )
      ) : (
        <div className="flex items-center justify-center">
          <SignIn
            afterSignInUrl={"/crafter/profile"}
            afterSignUpUrl={"/crafter"}
          />
        </div>
      )}
    </div>
  );
};

export default page;
