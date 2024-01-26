import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ImageScreen = ({ route }) => {
  const { image, ipDetails } = route.params;
  console.log(ipDetails)
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.ipPanel}>
        <View style={styles.ipInfoContent}>
          <Text style={styles.title}>
            IP Address
          </Text>
          <Text style={styles.content}>
            {ipDetails?.ip}
          </Text>
        </View>
        <View style={styles.ipInfoContent}>
          <Text style={styles.title}>
            Location
          </Text>
          <Text style={styles.content}>
            {`${ipDetails?.city} ${ipDetails?.country_code} ${ipDetails?.postal}`}
          </Text>
        </View>
        <View style={styles.ipInfoContent}>
          <Text style={styles.title}>
            Timezone
          </Text>
          <Text style={styles.content}>
            {`${ipDetails?.timezone.abbr} ${ipDetails?.timezone.utc}`}
          </Text>
        </View>
        <View style={styles.ipInfoContent}>
          <Text style={styles.title}>
            ISP
          </Text>
          <Text style={styles.content}>
            {ipDetails?.connection?.isp}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageContainer:{
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  image:{
    width: '100%',
    borderRadius: 20,
  },
  ipPanel:{
    backgroundColor: 'black',
    paddingHorizontal: 5,
    paddingVertical: 25,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  ipInfoContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    width: '100%'
  },
  content: {
    marginTop: 10,
    color:'gray',
    textAlign: 'center',
    fontSize: 12,
    width: '100%'
  },
})

export default ImageScreen;
