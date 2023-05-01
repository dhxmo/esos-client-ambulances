import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors } from '../globals/style';
import * as Location from 'expo-location';
import { mapStyle } from '../globals/mapStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

navigator.geolocation = require('react-native-geolocation-service');

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
        accuracy: Location.Accuracy.Highest,
      });

      if (loc && loc.coords.latitude && loc.coords.longitude) {
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setLoading(false);
      } else {
        // Wait for a second before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    })();
  }, []);

  const handleLocationConfirm = async () => {
    try {
      if (location.latitude && location.longitude) {
        await AsyncStorage.setItem('@location', JSON.stringify(location));
      }
      return true;
    } catch (error) {
      window.alert(error);
      return false;
    }
  };

  if (loading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#BE0000" />
      </View>
    );
  }

  // if pick other, update location to that specific geolocation lat/long
  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.locationContainer}>
        <TouchableOpacity
          onPress={() => {
            const go = handleLocationConfirm();
            if (go) {
              navigation.navigate('emergency-details');
            }
          }}
          style={[styles.button1]}
        >
          <Text style={styles.button1Text}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
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
        />
      </View>
    </View>
  );
};

export default LocationScreen;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 30,
    height: SCREEN_HEIGHT,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  autocompleteContainer: {
    marginTop: 10,
    marginBottom: 30,
    borderColor: 'black',
    height: 100,
    backgroundColor: colors.white,
    zIndex: 4,
    paddingBottom: 10,
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 100,
  },
  locationContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 300,
    paddingTop: 40,
  },
  map: {
    height: 600,
    width: SCREEN_WIDTH,
  },
  button1: {
    height: 80,
    width: 240,
    backgroundColor: colors.red,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    elevation: 20,
    marginTop: 30,
  },
  button1Text: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dropdownButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: 150,
    marginTop: 70,
    marginBottom: 30,
  },

  dropdownButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 20,
    width: '80%',
  },

  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },

  modalOptionText: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
  },

  view3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view8: {
    marginLeft: 10,
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT,
  },
});

const autoComplete = {
  textInput: {
    backgroundColor: colors.white,
    height: 60,
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontSize: 15,
    flex: 1,
    borderWidth: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.white,
    height: 400,
    width: 400,
    zIndex: 100,
  },

  textInputContainer: {
    flexDirection: 'row',
  },
};
