import { View, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapStyle } from '../globals/mapStyle';
import MapViewDirections from 'react-native-maps-directions';
import { BACKEND_SERVER_IP, GOOGLE_MAPS_API } from '../config/variables';
import { colors } from '../globals/style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const locationMarker = require('../../assets/location.png');
const ambulanceMarker = require('../../assets/ambulance.png');

const TrackAmbulanceScreen = ({}) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  // update using websockets
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);

  const [region, setRegion] = useState({
    latitude: location ? location.latitude : null,
    longitude: location ? location.longitude : null,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    async () => {
      const emergencyDetails = await AsyncStorage.getItem('@emergency-details');

      const emergencyDetailsParsed = JSON.parse(destinationLocation);

      // const destination = {
      //     latitude: destinationLocationParsed['latitude'],
      //     longitude: destinationLocationParsed['longitude'],
      // };

      // setLocation({
      //     latitude: destination['latitude'],
      //     longitude: destination['longitude'],
      // });
      // console.log(location);
    };

    // Get the GPS data for the ambulance from nodeJS websocket
    // and update the state variables
    // ===ws

    //   setLocation({
    //     latitude: 12.9693739,
    //     longitude: 77.6806338,
    //   });
    //   setRegion({
    //     latitude: location.latitude,
    //     longitude: location.longitude,
    //     latitudeDelta: 0.01,
    //     longitudeDelta: 0.01,
    //   });
  }, []);

  // TODO: make dynamic

  const origin = { latitude: 12.9693739, longitude: 77.6806338 };
  const ambulance = { latitude: 12.9593639, longitude: 77.6706238 };

  //TODO: Show details of emergency on this page as well

  return (
    <View style={styles.container}>
      {/* TODO: load the source and destination, not the whole world */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        showsUserLocation={true}
        followsUserLocation={true}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {origin.latitude != null && (
          <Marker coordinate={origin} anchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={locationMarker}
              style={styles.markerOrigin1}
              resizeMode="cover"
            />
          </Marker>
        )}
        {ambulance.latitude != null && (
          <Marker coordinate={ambulance} anchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={ambulanceMarker}
              style={styles.markerOrigin2}
              resizeMode="cover"
            />
          </Marker>
        )}
        <MapViewDirections
          origin={origin}
          destination={ambulance}
          apikey={GOOGLE_MAPS_API}
          strokeWidth={4}
          strokeColor={colors.red}
        />
      </MapView>
    </View>
  );
};

export default TrackAmbulanceScreen;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    height: SCREEN_HEIGHT,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  map: {
    height: (3 / 4) * SCREEN_HEIGHT,
    marginVertical: 10,
    width: SCREEN_WIDTH,
  },
  markerOrigin1: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  destination: {
    width: 20,
    height: 20,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDestination: {
    width: 16,
    height: 16,
  },
  markerOrigin2: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  audioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  soundWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  audioContainerText: {
    textAlign: 'center',
  },
  innerButton: {
    width: 50,
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.red,
    borderWidth: 4,
    marginVertical: 15,
    elevation: 10,
  },
  innerButton2: {
    width: 20,
    height: 20,
    backgroundColor: colors.red,
    borderRadius: 100,
  },
  sendBtn: {
    width: 150,
    height: 70,
    backgroundColor: colors.red,
    color: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    margin: 10,
    marginVertical: 10,
    padding: 20,
  },
  sendBtnText: {
    color: colors.white,
    fontSize: 20,
  },
});
