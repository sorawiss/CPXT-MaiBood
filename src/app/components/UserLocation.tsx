"use client";
import { useEffect, useState } from "react";
import reverseGeocoding from "@/utils/reverse-geocoding";
import { getDistance } from 'geolib';


interface GeolocationError {
    code: number;
    message: string;
}


function UserLocation() {
    const [location, setLocation] = useState<{ latitude: number, longitude: number, accuracy: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<GeolocationError | null>(null);
    const [address, setAddress] = useState<string | null>(null);
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
                setAddress(data.display_name);
            }
        }
        fetchReverseGeocoding();
    }, [location]);


    // Render the component
    return (
        <div>
            <h1>User Location</h1>
            {loading && (
                <p>Loading location...</p>
            )}

            {error && (
                <p style={{ color: 'red' }}>
                    Error: {error.message} (Code: {error.code})
                </p>
            )}

            {location && (
                <div>
                    <p><strong>Latitude:</strong> {location.latitude}</p>
                    <p><strong>Longitude:</strong> {location.longitude}</p>
                    <p><em>(Accuracy: {location.accuracy.toFixed(2)} meters)</em></p>
                    <p><strong>Address:</strong> {address}</p>
                    <p><strong>Distance:</strong> {distance} meters</p>
                </div>
            )}
        </div>
    );
}

export default UserLocation;