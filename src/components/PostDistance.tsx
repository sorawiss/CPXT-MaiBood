"use client";

import { useState, useEffect } from "react";
import Distance from "@/components/Distance";

interface Location {
  latitude: number;
  longitude: number;
}

export default function PostDistance({ postLocation }: { postLocation: Location | null }) {
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    const localLocationData = localStorage.getItem('userLocation');
    if (localLocationData) {
      const { location: storedLocation } = JSON.parse(localLocationData);
      setUserLocation(storedLocation);
    }
  }, []);

  if (!userLocation || !postLocation) {
    return <div>ไม่พบข้อมูลตำแหน่ง</div>;
  }

  return <Distance userLocation={userLocation} ownerLocation={postLocation} />;
} 