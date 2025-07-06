"use client";
import { useEffect, useState } from "react";
import reverseGeocoding from "@/utils/reverse-geocoding";
import { getDistance } from 'geolib';
import { LocationEdit } from 'lucide-react';


interface GeolocationError {
    code: number;
    message: string;
}


function UserLocation() {
    const [location, setLocation] = useState<{ latitude: number, longitude: number, accuracy: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<GeolocationError | null>(null);
    const [address, setAddress] = useState<any | null>(null);
    const [distance, setDistance] = useState<number | null>(null)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError({ code: 404, message: 'Geolocation is not supported by your browser.' });
            setLoading(false);
            return;
        }

        // Success callback
        const handleSuccess = (position: GeolocationPosition) => {
            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
            };
            setLocation(newLocation);
            setLoading(false);
            setError(null);
            console.log('Location:', newLocation);
        };

        // Error callback
        const handleError = (error: GeolocationPositionError) => {
            console.log('Error code:', error.code);
            console.log('Error message:', error.message);
            setError({ code: error.code, message: error.message });
            setLoading(false);
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        // Request the user's location
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
    }, []);


    // Calculate distance
    useEffect(() => {
        if (location) {
            const targetLocation = { latitude: 11.793369, longitude: 99.789215 };
            setDistance(getDistance(location, targetLocation))
        }
    }, [location])


    // Reverse geocoding
    useEffect(() => {
        const fetchReverseGeocoding = async () => {
            if (location) {
                const data = await reverseGeocoding(location.latitude, location.longitude);
                console.log('Reverse geocoding:', data);
                setAddress(data.address);
            }
        }
        fetchReverseGeocoding();
    }, [location]);


    // Render the component
    return (
        <div>
            {loading && (
                <p>Loading location...</p>
            )}

            {error && (
                <p style={{ color: 'red' }}>
                    Error: {error.message} (Code: {error.code})
                </p>
            )}

            {location && (
                <div className="flex items-center gap-[0.5rem] " >
                    {/* <p><strong>Latitude:</strong> {location.latitude}</p>
                    <p><strong>Longitude:</strong> {location.longitude}</p>
                    <p><em>(Accuracy: {location.accuracy.toFixed(2)} meters)</em></p> */}
                    {/* <p><strong>Distance:</strong> {distance} meters</p> */}
                    <p className="p3 text-backgroundsecondary">
                        คุณกำลังอยู่ที่ {address?.quarter}, {address?.suburb}
                    </p>
                    <LocationEdit className="w-[1rem] h-[1rem] text-backgroundsecondary" />
                </div>
            )}
        </div>
    );
}

export default UserLocation;