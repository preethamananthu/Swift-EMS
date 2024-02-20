"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';



export function Map() {
  // State variables to hold distance and duration
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const mapRef = useRef(null);
  const originInputRef = useRef(null);
  const destinationInputRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const mapOptions = {
        center: { lat: 12.9716, lng: 77.5946 }, // Bangalore, KA
        zoom: 12,
        disableDefaultUI: true,
      };

      

      const mapElement = document.getElementById('map');

      if (mapElement) {
        const map = new google.maps.Map(mapElement, mapOptions);
        mapRef.current = map;

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap?.(map);

        // Set up autocomplete for origin and destination input fields
        const originAutocomplete = new google.maps.places.Autocomplete(originInputRef.current);
        const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInputRef.current);

        // Listen for place changes in the origin input field
        originAutocomplete.addListener('place_changed', () => {
          const place = originAutocomplete.getPlace();
          updateRoute(place.formatted_address, destinationInputRef.current?.value || '');
        });

        // Listen for place changes in the destination input field
        destinationAutocomplete.addListener('place_changed', () => {
          const place = destinationAutocomplete.getPlace();
          updateRoute(originInputRef.current?.value || '', place.formatted_address);
        });
      }
    });
  }, []);

  const updateRoute = (origin, destination) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap?.(mapRef.current);

    const request = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);

        if (result && result.routes && result.routes.length > 0) {
          const route = result.routes[0];
          if (route.legs && route.legs.length > 0) {
            const leg = route.legs[0];
  
            const newDistance = leg.distance?.text || '';
            const newDuration = leg.duration?.text || '';
  
            setDistance(newDistance);
            setDuration(newDuration);
          }
        }
      } else {
        console.error('Error calculating route:', status);
      }
    });
  };

  return (
    <>
      <div id="map" className='h-60 w-96 lg:h-[400px] lg:w-[700px] rounded-3xl' />
      {/* <div id="map" style={{ height: "400px", width: "700px", position: "static", borderRadius: "24px"}} /> */}
      <div className='flex flex-col m-4 '>
      <input ref={originInputRef} type="text" placeholder="Enter your location" className="px-4 py-2 rounded-md mb-1 border" />
      <input ref={destinationInputRef} type="text" placeholder="Enter your destination" className="px-4 py-2 rounded-md mb-1 border" />
      {distance && <p className='text-sm font-semibold'>Distance: <span className=' font-bold'>{distance}</span></p>}
      {duration && <p className='text-sm font-semibold'>Duration: <span className=' font-bold'>{duration}</span></p>}

      </div>
    </>
  );
}

