import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import cross from '../../assets/redCross.png';
import { parameters, colors } from '../globals/style';
import { WEBSOCKET_ENDPOINT } from '../config/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmergencyDetails = ({ navigation }) => {
  const [emergency, setEmergency] = useState(true);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_ENDPOINT);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received WebSocket message:', data);

      if (data.type === 'emergency') {
        setEmergency(data);
        setShowButton(true);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleStart = async () => {
    // Send a message to the server to start the emergency
    console.log('Starting emergency:', emergency.id);

    await AsyncStorage.setItem('@emergency-details', JSON.stringify(emergency));
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.img} source={cross} />
        <Text style={styles.headerText}>esos ambulance</Text>
      </View>

      {/* {emergency ? ( */}
      <View style={styles.emergencyDetails}>
        <Text>
          Emergency details here... Emergency details here... Emergency details
          here... Emergency details here... Emergency details here...
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const go = handleStart();
            if (go) {
              navigation.navigate('track');
            }
          }}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
      {/* ) : (
        <View>
          <Text style={styles.headerText}>no emergencies right now</Text>
        </View>
      )} */}
    </View>
  );
};

export default EmergencyDetails;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    height: SCREEN_HEIGHT,
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: parameters.headerHeight * 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  img: {
    resizeMode: 'contain',
    zIndex: -1,
  },
  emergencyDetails: {
    width: '80%',
    height: '50%',
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 80,
    width: 240,
    backgroundColor: colors.white,
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
  buttonText: {
    color: colors.red,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
