import { getDistance } from 'geolib';
import { MapPin } from 'lucide-react';

interface DistanceProps {
  userLocation: { latitude: number; longitude: number };
  ownerLocation: { latitude: number; longitude: number };
}

function Distance({ userLocation, ownerLocation }: DistanceProps) {
  if (!userLocation || !ownerLocation) {
    return <div>ไม่พบข้อมูลตำแหน่ง</div>;
  }

  const distance = getDistance(userLocation, ownerLocation);
  const distanceKm = (distance / 1000)
  const displayDistance = distanceKm < 0.5 ? "อยู่ใกล้มาก ๆ" : distanceKm.toFixed(2) + " กม.";



  return (
    <div className="flex items-center gap-1">
      <MapPin className='text-makro ' />
      <p className="p3 text-textprimary">อยู่ห่างจากคุณ {displayDistance}</p>
    </div>
  );
}

export default Distance