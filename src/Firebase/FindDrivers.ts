import firestore from '@react-native-firebase/firestore';

/**
 * Calculate the distance between two coordinates using Haversine formula.
 */
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const toRad = (value: any) => (value * Math.PI) / 180;

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Fetch drivers within a specified area and sort by proximity.
 */
const fetchNearbyDrivers = async (
  lat: number,
  long: number,
  distance: number,
): Promise<NearbyDriverData[]> => {
  try {
    const driversRef = firestore().collection('Users'); // Adjust your collection name
    const snapshot = await driversRef.get();
    const drivers: any[] = [];
    snapshot.forEach(doc => {
      const driverData = doc.data();
      const driverLat = driverData?.latitude;
      const driverLong = driverData?.longitude;

      if (driverLat && driverLong) {
        // Calculate distance
        const calculatedDistance = calculateDistance(
          lat,
          long,
          driverLat,
          driverLong,
        );

        if (calculatedDistance <= distance) {
          drivers.push({
            id: doc.id,
            latitude: driverLat,
            longitude: driverLong,
            distance: calculatedDistance, // Include distance for sorting
          });
        }
      }
    });

    // Sort drivers by distance (nearest first)
    drivers.sort((a, b) => a.distance - b.distance);

    return drivers;
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};

export default fetchNearbyDrivers;

interface NearbyDriverData {
  id: string;
  latitude: number;
  longitude: number;
  distance: number;
}
