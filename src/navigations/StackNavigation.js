import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LogInScreen from '../screens/LoginScreen';


const Main = createNativeStackNavigator();

export function MainStack() {
    return (
        <Main.Navigator>
            <Main.Screen
                name="register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Main.Screen
                name="login"
                component={LogInScreen}
                options={{ headerShown: false }}
            />


        </Main.Navigator>
    )
}