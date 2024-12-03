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
import {NewBookingResponse} from '../../../../../Models/Booking/booking.modal';
import {CIRCLE, moderateScale, Styles} from '../../../../../constants/Utils';
import {BCOLOR} from '../../../../../components/CustomFont/MyFont';
import {userByID, userCollection} from '../../../../../Firebase/firebaseCommon';
import Colors from '../../../../../constants/Colors';
import Fonts from '../../../../../constants/Fonts';
import {calculateETA} from '../../../../../Hooks/useGetCurrentLocation';

const Mapviewshow = (bookingData: NewBookingResponse) => {
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const mapRef = useRef<MapView | null>(null);
  const pickupLocation: LatLng = {
    latitude: bookingData?.pick_up_lat,
    longitude: bookingData?.pick_up_lng,
  }; // Update with your pickup location
  const deliveryLocation: LatLng = {
    latitude: bookingData?.drop_of_lat,
    longitude: bookingData?.drop_of_lng,
  }; // Update with your delivery location

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
          latitude: bookingData?.pick_up_lat, // Set initial region latitude
          longitude: bookingData?.pick_up_lng, // Set initial region longitude
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

        {bookingData?.driver_id && (
          <CarLocation driverId={bookingData?.driver_id} />
        )}
        <Marker coordinate={pickupLocation} tracksViewChanges={false}>
          <View
            style={[CIRCLE(18), {backgroundColor: 'black'}, Styles.centerDiv]}>
            <View style={[CIRCLE(4), BCOLOR('white')]}></View>
          </View>
        </Marker>
        {/* Destination Marker with Time Estimate */}
        <Marker
          coordinate={deliveryLocation}
          tracksViewChanges={false}
          pointerEvents="auto"
          anchor={{x: 1, y: 1}}>
          <Image
            source={Images.MyLocation}
            resizeMode="contain"
            style={{
              height: 43,
              width: 18,
              resizeMode: 'contain',
            }}
          />
          <Callout
            tooltip
            pointerEvents="auto"
            style={{
              paddingBottom: 5,
              height: 40,
              width: 100,
            }}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{`10 mins`}</Text>
            </View>
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
    height: 40,
    width: 100,
    justifyContent: 'center',
    padding: 8,
  },
  calloutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  etaContainer: {
    height: moderateScale(34),
    borderRadius: moderateScale(44),
    backgroundColor: Colors.blue,
    width: moderateScale(109),
    alignSelf: 'flex-end',
    marginTop: 20,
    marginEnd: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  etaText: {
    fontFamily: Fonts.semiBold,
    color: Colors.white,
    fontSize: moderateScale(12),
  },
});

const CarLocation = ({driverId}: {driverId: number}) => {
  const [carPosition, setCarPosition] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  console.log('🚀 ~ CarLocation ~ carPosition:', carPosition, driverId);
  useEffect(() => {
    userByID(String(driverId)).onSnapshot(doc => {
      setCarPosition({
        latitude: doc.data()?.latitude,
        longitude: doc.data()?.longitude,
      });
    });
  }, []);
  return (
    <>
      <Marker.Animated
        coordinate={carPosition}
        // tracksViewChanges={false}
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
    </>
  );
};

export const ETA = (bookingData: NewBookingResponse) => {
  const [eta, setEta] = useState<number>(0);
  useEffect(() => {
    userByID(String(bookingData?.driver_id))
      .get()
      .then(doc => {
        const driverLatitude = doc.data()?.latitude;
        const driverLongitude = doc.data()?.longitude;
        calculateETA(
          driverLatitude,
          driverLongitude,
          bookingData?.status == '2'
            ? bookingData?.pick_up_lat
            : bookingData?.drop_of_lat,
          bookingData?.status == '2'
            ? bookingData?.pick_up_lng
            : bookingData?.drop_of_lng,
        ).then(eta => {
          setEta(eta);
        });
      });
  }, []);
  return (
    <>
      {eta !== 0 && bookingData?.status == '2' && (
        <View style={styles.etaContainer}>
          <Text style={styles.etaText}>ETA: {eta}</Text>
        </View>
      )}
      {eta !== 0 && bookingData?.status == '3' && (
        <View style={styles.etaContainer}>
          <Text style={styles.etaText}>{eta}</Text>
        </View>
      )}
    </>
  );
};
