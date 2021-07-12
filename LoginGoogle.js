import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';

export default function App() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [userInfo, setUserInfo] = useState('');

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  }
  const handleGoogleSignIn = () => {
    const config = {iosClientId: `615780480419-5v0c984c53vkv3i23ugkahqrg2iu8674.apps.googleusercontent.com`,
      androidClientId: `615780480419-1u67l3naqv7fj5g82ogupsrh3dgbptu7.apps.googleusercontent.com`,
      scopes: ['profile', 'email']
    };
    Google.logInAsync(config).then((result) => {
      const {type, user} = result;
      if (type == 'success') {
        handleMessage('Google signin successful', 'SUCCESS');
        alert('Logado');
        setUserInfo(user);
      }
      else {
        handleMessage('Google SignIn was cancelled');
      }
    })
    .catch(error => {
      console.log(error);
      handleMessage('An error ocurred')
    })
  }
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={handleGoogleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
