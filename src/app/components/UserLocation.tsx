"use client";
import { useEffect, useState } from "react";
import reverseGeocoding from "@/utils/reverse-geocoding";
import { getDistance } from 'geolib';
import { LocationEdit } from 'lucide-react';
import { updateUserLocation, getUserLocation } from "../actions/location";


interface GeolocationError {
    code: number;
    message: string;
}


function UserLocation() {
    const [location, setLocation] = useState<{ latitude: number, longitude: number, accuracy: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<GeolocationError | null>(null);
    const [address, setAddress] = useState<any | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const [isUpdatingLocation, setIsUpdatingLocation] = useState<boolean>(false);


    async function fetchReverseGeocoding() {
        if (location) {
            try {
                const data = await reverseGeocoding(location.latitude, location.longitude);
                console.log('Reverse geocoding:', data);
                setAddress(data.address);
            } catch (error) {
                console.error('Failed to fetch reverse geocoding:', error);
                setError({ code: 500, message: 'Failed to get address information' });
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        const initializeLocation = async () => {
            try {
                const cachedLocation = await getUserLocation();
                console.log('Cached location:', cachedLocation);

                if (cachedLocation.success && cachedLocation.location) {
                    setLocation({
                        latitude: cachedLocation.location.latitude,
                        longitude: cachedLocation.location.longitude,
                        accuracy: 0
                    });
                    console.log('Using cached location:', cachedLocation.location);
                    return;
                }

                // If no cached location, get from browser
                if (!navigator.geolocation) {
                    setError({ code: 404, message: 'Geolocation is not supported by your browser.' });
                    setLoading(false);
                    return;
                }

                // Success callback
                const handleSuccess = async (position: GeolocationPosition) => {
                    const newLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    };
                    setLocation(newLocation);
                    setError(null);
                    console.log('New location:', newLocation);

                    // Save to database
                    setIsUpdatingLocation(true);
                    try {
                        await updateUserLocation(newLocation.latitude, newLocation.longitude);
                        console.log('Location saved to database');
                    } catch (error) {
                        console.error('Failed to save location to database:', error);
                    } finally {
                        setIsUpdatingLocation(false);
                    }
                };

                // Error callback
                const handleError = (error: GeolocationPositionError) => {
                    console.log('Error code:', error.code);
                    console.log('Error message:', error.message);
                    switch (error.code) {
                        case 1:
                            setError({ code: error.code, message: 'กรุณาอนุญาตให้เว็บไซต์เข้าถึงตำแหน่งของคุณ' });
                            break;
                        case 2:
                            setError({ code: error.code, message: 'กรุณาเปิด GPS ของคุณ เพื่อเข้าถึงตำแหน่งของคุณ' });
                            break;
                        case 3:
                            setError({ code: error.code, message: 'เวลาหมดอายุของตำแหน่งของคุณ' });
                            break;
                        default:
                            setError({ code: error.code, message: error.message });
                    }
                    setLoading(false);
                };

                const options = {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                };

                // Request the user's location
                navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
            } catch (error) {
                console.error('Error initializing location:', error);
                setError({ code: 500, message: 'Failed to initialize location' });
                setLoading(false);
            }
        };

        initializeLocation();
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
        if (location && !address) {
            fetchReverseGeocoding();
        }
    }, [location]);


    // Function to manually refresh location
    const refreshLocation = async () => {
        if (!navigator.geolocation) {
            setError({ code: 404, message: 'Geolocation is not supported by your browser.' });
            return;
        }

        setIsUpdatingLocation(true);
        setLoading(true); // Show loading when refreshing
        setAddress(null); // Clear previous address

        const handleSuccess = async (position: GeolocationPosition) => {
            const newLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
            };
            setLocation(newLocation);
            setError(null);
            console.log('Location refreshed:', newLocation);

            try {
                await updateUserLocation(newLocation.latitude, newLocation.longitude);
                console.log('Updated location saved to database');
            } catch (error) {
                console.error('Failed to save updated location to database:', error);
            } finally {
                setIsUpdatingLocation(false);
            }
        };

        const handleError = (error: GeolocationPositionError) => {
            console.log('Error code:', error.code);
            console.log('Error message:', error.message);
            switch (error.code) {
                case 1:
                    setError({ code: error.code, message: 'กรุณาอนุญาตให้เว็บไซต์เข้าถึงตำแหน่งของคุณ' });
                    break;
                case 2:
                    setError({ code: error.code, message: 'กรุณาเปิด GPS ของคุณ' });
                    break;
                case 3:
                    setError({ code: error.code, message: 'เวลาหมดอายุของตำแหน่งของคุณ' });
                    break;
                default:
                    setError({ code: error.code, message: error.message });
            }
            setIsUpdatingLocation(false);
            setLoading(false);
        };

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
    };

    // Render the component
    return (
        <div>
            {loading && (
                <p className="p3 text-backgroundsecondary">กำลังค้นหาตำแหน่งของคุณ...</p>
            )}

            {error && (
                <p className="p3 text-backgroundsecondary">
                    {error.message}
                </p>
            )}

            {location && address && !loading && (
                <div className="flex items-center gap-[0.5rem]">
                    <p className="p3 text-backgroundsecondary">
                        คุณกำลังอยู่ที่ {address?.quarter || address?.county}, {address?.suburb || address?.city_district}
                    </p>
                    <button
                        onClick={refreshLocation}
                        disabled={isUpdatingLocation}
                        className="disabled:opacity-50 hover:cursor-pointer"
                        title="Refresh location"
                    >
                        <LocationEdit className="w-[1rem] h-[1rem] text-backgroundsecondary" />
                    </button>
                    {isUpdatingLocation && (
                        <span className="text-xs text-backgroundsecondary">Updating...</span>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserLocation;