import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../screens/LoginScreen';
import LocationScreen from '../screens/LocationScreen';
import TrackAmbulance from '../screens/TrackAmbulance';
import EmergencyDetails from '../screens/EmergencyDetails';

const Main = createNativeStackNavigator();

export function MainStack() {
  return (
    <Main.Navigator>
      <Main.Screen
        name="login"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Main.Screen
        name="location"
        component={LocationScreen}
        options={{ headerShown: false }}
      />
      <Main.Screen
        name="emergency-details"
        component={EmergencyDetails}
        options={{ headerShown: false }}
      />
      <Main.Screen
        name="track"
        component={TrackAmbulance}
        options={{ headerShown: false }}
      />
    </Main.Navigator>
  );
}
