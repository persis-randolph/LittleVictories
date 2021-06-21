import React from 'react';
import { View, Button, Linking } from 'react-native';

const Login = () => {
  return (
    <View>
      <Button title="Log In With Facebook" onPress={() => Linking.openURL('/auth/facebook')} />
    </View>
  );
};

export default Login;

