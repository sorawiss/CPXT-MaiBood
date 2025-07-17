import { getCurrentUser } from "@/utils/user";
import { getFridgeItems, getUser, countItemsByCategory } from "@/utils/DALs";

export async function getFridgeItemsData() {
    const user = await getCurrentUser();
    if (!user) {
        // This should be handled by verifySession redirecting, but as a safeguard.
        return { items: [], count: 0, categoryCounts: {} };
    }

    const [items, categoryCounts] = await Promise.all([
        getFridgeItems(user.id),
        countItemsByCategory(user.id)
    ]);
    
    return {
        items,
        count: items.length,
        categoryCounts
    };
}

export async function getUserData() {
    const user = await getCurrentUser();
    if (!user) {
        return { userName: null };
    }
    const userData = await getUser(user.id);
    return { userName: userData };
} 