export default async function reverseGeocoding(latitude: number, longitude: number) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
        headers: {
            'User-Agent': 'MaiBood-CPAXT'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch reverse geocoding data');
    }
    
    const data = await response.json();
    return data;
}