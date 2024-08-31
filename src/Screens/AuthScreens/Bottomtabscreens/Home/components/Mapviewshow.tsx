import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View, Animated, Text, Alert} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  LatLng,
  Callout,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Images from '../../../../../constants/Images'; // Update with your path
import {MapStyle} from './Mapstyle';
import {GOOGLE_MAP_API} from '../../../../../map/KeyMap'; // Update with your path

const Mapviewshow: React.FC = () => {
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const carPosition = useRef(
    new AnimatedRegion({
      latitude: 40.7808, // Initial latitude for the car
      longitude: -73.9772, // Initial longitude for the car
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
  ).current;
  const mapRef = useRef<MapView | null>(null);
  const angleRef = useRef<number>(0);

  const pickupLocation: LatLng = {latitude: 40.7808, longitude: -73.9772}; // Update with your pickup location
  const deliveryLocation: LatLng = {latitude: 40.781, longitude: -73.9857}; // Update with your delivery location

  useEffect(() => {
    if (routeCoordinates.length > 1) {
      // animateCar();
    }
  }, [routeCoordinates]);

  const animateCar = () => {
    routeCoordinates.forEach((coordinate, index) => {
      if (index === 0) return; // Skip the first coordinate

      setTimeout(() => {
        const nextCoordinate = routeCoordinates[index];
        const prevCoordinate = routeCoordinates[index - 1];
        const bearing = calculateBearing(prevCoordinate, nextCoordinate);
        angleRef.current = Number(bearing.toFixed(0));

        carPosition
          .timing({
            latitude: nextCoordinate.latitude,
            longitude: nextCoordinate.longitude,
            duration: 1000, // Adjust duration for each step
            useNativeDriver: false,
          })
          .start(() => {
            // Check if the car has reached the final destination coordinate
            if (index === routeCoordinates.length - 1) {
              const distanceToDestination = getDistance(
                nextCoordinate,
                deliveryLocation,
              );

              if (distanceToDestination < 10) {
                // 10 meters tolerance
                Alert.alert(
                  'Reached Destination',
                  'You have arrived at your destination.',
                );
              }
            }
          });

        if (mapRef.current) {
          mapRef.current.animateCamera(
            {
              center: nextCoordinate,
              pitch: 45,
              altitude: 100,
              heading: bearing,
              zoom: 18, // Zoom level as per your requirement
            },
            {duration: 1000},
          );
        }
      }, index * 1000); // Adjust delay to sync with the duration of each step
    });
  };

  const calculateBearing = (start: LatLng, end: LatLng): number => {
    const lat1 = (start.latitude * Math.PI) / 360;
    const lon1 = (start.longitude * Math.PI) / 360;
    const lat2 = (end.latitude * Math.PI) / 360;
    const lon2 = (end.longitude * Math.PI) / 360;

    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const brng = Math.atan2(y, x);

    return ((brng * 180) / Math.PI + 360) % 360;
  };

  const getDistance = (start: LatLng, end: LatLng): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (start.latitude * Math.PI) / 180; // φ, λ in radians
    const φ2 = (end.latitude * Math.PI) / 180;
    const Δφ = ((end.latitude - start.latitude) * Math.PI) / 180;
    const Δλ = ((end.longitude - start.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
  };
  console.log(angleRef.current);
  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        userLocationCalloutEnabled={true}
        userLocationPriority="high"
        showsTraffic={false}
        pitchEnabled={false}
        scrollEnabled
        followsUserLocation={true}
        zoomControlEnabled
        zoomTapEnabled
        zoomEnabled
        scrollDuringRotateOrZoomEnabled
        style={{flex: 1}}
        initialRegion={{
          latitude: 40.7808, // Set initial region latitude
          longitude: -73.9772, // Set initial region longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        customMapStyle={MapStyle}
        showsCompass={true}
        showsBuildings={false}
        showsIndoors={false}
        showsScale={false}
        showsIndoorLevelPicker={false}>
        {/* <Marker coordinate={pickupLocation} image={Images.MyLocation} /> */}

        <MapViewDirections
          origin={pickupLocation}
          destination={deliveryLocation}
          apikey={GOOGLE_MAP_API}
          strokeColor="#2871F2"
          strokeWidth={5}
          precision="high"
          onReady={result => {
            setRouteCoordinates(result.coordinates);
            setDuration(result.duration);
          }}
          onError={err => {
            console.log(err);
          }}
        />

        <Marker.Animated
          coordinate={carPosition}
          // rotation={angleRef.current}
        >
          <Image
            source={Images.CarLocation}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              transform: [{rotate: `${'-110'}deg`}], // Rotate the car image based on the bearing angle
            }}
          />
        </Marker.Animated>

        {/* Destination Marker with Time Estimate */}
        <Marker coordinate={deliveryLocation} image={Images.MyLocation}>
          <Callout
            tooltip
            style={{
              paddingBottom: 5,
            }}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{`${Math.round(
                duration,
              )} mins`}</Text>
            </View>
            <Image
              source={Images.angle}
              style={{
                width: 15,
                height: 8.5,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

export default Mapviewshow;

const styles = StyleSheet.create({
  timeEstimateContainer: {
    backgroundColor: '#2871F2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  timeEstimateText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  calloutContainer: {
    backgroundColor: '#2871F2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    padding: 8,
  },
  calloutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import MapView from 'react-native-maps';
// import {MapStyle} from './Mapstyle';

// const Mapviewshow = () => {
//   return (
//    <View style={
//     {
//      flex:1
//     }
//     }>
//       <MapView
//         userLocationCalloutEnabled={true}
//         userLocationPriority="high"
//         showsTraffic={false}
//         pitchEnabled={false}
//         scrollEnabled
//         followsUserLocation={true}
//         zoomControlEnabled
//         zoomTapEnabled
//         zoomEnabled
//         scrollDuringRotateOrZoomEnabled
//         style={{flex: 1}}
//         initialRegion={{
//           latitude: 40.7808, // Set initial region latitude
//           longitude: -73.9772, // Set initial region longitude
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         provider="google"
//         customMapStyle={MapStyle}
//         showsCompass={true}
//         showsBuildings={false}
//         showsIndoors={false}
//         showsScale={false}
//         showsIndoorLevelPicker={false}></MapView>
//     </View>
//   );
// };

// export default Mapviewshow;

// const styles = StyleSheet.create({});
