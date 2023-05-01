import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { parameters } from '../globals/style';
import cross from '../../assets/redCross.png';
import { inputContainer, btn, input } from '../globals/style';
import { BACKEND_SERVER_IP } from '../config/variables';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInScreen = ({ navigation }) => {
  const [driverPhone, setDriverPhone] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);
  const [ambulanceType, setAmbulanceType] = useState('');
  const [items, setItems] = useState([
    { label: 'Advanced Life Support', value: 'ALS' },
    { label: 'Basic Life Support', value: 'BLS' },
  ]);

  const handleLogin = async () => {
    const data = {
      driverPhone,
      password,
    };

    try {
      // const response = await axios.post(
      //   `${BACKEND_SERVER_IP}/api/ambulance/login`,
      //   JSON.stringify(data),
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );

      // const sessionToken = response.data.token;

      // await AsyncStorage.setItem('@sessionToken', sessionToken);
      // await AsyncStorage.setItem('@driverPhone', phoneNumber);

      window.alert('Logged in successfully');
      return true;
    } catch (error) {
      window.alert(error);
      return false;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.img} source={cross} />
        <Text style={styles.headerText}>esos ambulance</Text>
      </View>
      <View style={styles.inputs}>
        <View style={inputContainer}>
          <TextInput
            style={input}
            value={driverPhone}
            onChangeText={setDriverPhone}
            placeholder="Phone Number"
            keyboardType="number-pad"
          />
        </View>
        <View style={inputContainer}>
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={input}
            placeholder="password"
          />
        </View>
        <TouchableOpacity>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={items}
            setItems={setItems}
            zIndex={2000}
            value={ambulanceType}
            setValue={setAmbulanceType}
            containerStyle={{ height: 40 }}
            style={styles.dropDown}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownContainerStyle={styles.dropDownStyleContainer}
          />
        </TouchableOpacity>
      </View>

      <View style={btn}>
        <TouchableOpacity
          onPress={async () => {
            const go = await handleLogin();
            if (go) {
              navigation.navigate('location');
            }
          }}
        >
          <Text style={styles.text}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  dropDown: {
    width: '80%',
    marginVertical: 20,
  },
  dropDownStyleContainer: {
    width: '80%',
    marginBottom: 30,
  },
  inputs: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
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
  head: {
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    color: 'grey',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  others: {
    marginVertical: 10,
  },
});
export default LogInScreen;
