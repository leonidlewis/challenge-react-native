import React from 'react';
import { View, Text, Image } from 'react-native';

const ImageScreen = ({ route }) => {
  // const { image, ipDetails } = route.params;
  const image  = ''
  const ipDetails = ''

  return (
    <View>
      <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      <Text>IP: {ipDetails.ip}</Text>
      <Text>ISP: {ipDetails.isp}</Text>
    </View>
  );
};

export default ImageScreen;
