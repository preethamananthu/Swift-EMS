"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";

const containerStyle = {
  width: "700px",
  height: "400px",
};

const MapDriver = () => {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Fetch current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);

  return (
    <div
      id="map"
      className="h-60 w-96 lg:h-[400px] lg:w-[700px] rounded-3xl overflow-hidden"
    >
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation}
          zoom={15}
        >
          {currentLocation && (
            <>
              <Circle
                center={currentLocation}
                radius={1000} // radius in meters
                options={{
                    strokeColor: "#329df4",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#329df4",
                    fillOpacity: 0.2,
                }}
                />
                <Marker position={currentLocation} />
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapDriver;
