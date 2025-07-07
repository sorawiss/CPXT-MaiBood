"use server"

import { verifySession } from "@/utils/session";
import { addLocation } from "@/utils/DALs";
import { prismaDB } from "@/lib/prisma-client";

export async function updateUserLocation(latitude: number, longitude: number) {
    try {
        const user = await verifySession();
        const updatedUser = await addLocation(latitude, longitude, user.userId as string);
        return { success: true, user: updatedUser };    
    } catch (error) {
        console.error("Error updating user location:", error);
        return { success: false, error: "Failed to update location" };
    }
}

export async function getUserLocation() {
    try {
        const user = await verifySession();
        const userData = await prismaDB.user.findUnique({
            where: { id: user.userId as string }
        });
        
        return { 
            success: true, 
            location: userData?.latitude && userData?.longitude 
                ? { latitude: userData.latitude, longitude: userData.longitude }
                : null 
        };
    } catch (error) {
        console.error("Error getting user location:", error);
        return { success: false, error: error };
    }
} 