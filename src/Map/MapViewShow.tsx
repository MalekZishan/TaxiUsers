import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState, useEffect, memo} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MyAutoPlaces from '../components/InputText/MyAutoPlaces';
import Images from '../constants/Images';
import {useGetStatusBarHeight} from '../Hooks/dimentionHook';
import {MapStyle} from './Mapstyle';

type Props = {};

const DEFAULT_LOCATION = {
  latitude: 24.4539, // Abu Dhabi latitude
  longitude: 54.3773, // Abu Dhabi longitude
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapViewShow = (props: Props) => {
  const [Location, setLocation] = useState('');
  const [latLng, setLatLng] = useState<any>(DEFAULT_LOCATION);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(latLng, 1000); // Smooth animation duration
    }
  }, [latLng]);

  return (
    <>
      <MapView
        ref={mapRef}
        loadingIndicatorColor="black"
        scrollEnabled
        provider="google"
        customMapStyle={MapStyle}
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        initialRegion={DEFAULT_LOCATION}>
        <Marker
          description="Selected Location"
          draggable
          onDragEnd={e => {
            const {latitude, longitude} = e.nativeEvent.coordinate;
            setLatLng({
              ...latLng,
              latitude,
              longitude,
            });
          }}
          coordinate={{
            latitude: latLng.latitude,
            longitude: latLng.longitude,
          }}
        />
      </MapView>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          paddingHorizontal: 7,
          top: 0,
          marginTop: useGetStatusBarHeight() + 50,
          zIndex: 999,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <MyAutoPlaces
            lImg={Images.search}
            placeholder="Search"
            float
            onLatLongChange={(lat, long) => {
              if (lat && long) {
                setLatLng({
                  ...latLng,
                  latitude: lat,
                  longitude: long,
                });
              } else {
                setLatLng(DEFAULT_LOCATION);
              }
            }}
            onChangeText={text => {
              setLocation(text);
            }}
          />
        </View>
        <Image
          source={Images.Fillter}
          style={{
            width: 48,
            marginEnd: 10,
            height: 48,
          }}
        />
      </View>
    </>
  );
};

export default memo(MapViewShow);

const styles = StyleSheet.create({});
