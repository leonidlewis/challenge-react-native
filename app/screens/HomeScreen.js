import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {fetchIPDetails} from '../services/IPService';
import SearchBar from '../components/SearchBar';
import Carousel from 'react-native-reanimated-carousel';

const {width} = Dimensions.get('window');
const HomeScreen = ({navigation}) => {
  const [ip, setIp] = useState('');
  const [ipDetails, setIpDetails] = useState(null);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetchIPDetails().then(data => setIpDetails(data));
  }, []);

  const handleIPSubmit = () => {
    fetchIPDetails(ip).then(data => setIpDetails(data));
  };

  const handleImageSelect = image => {
    navigation.navigate('ImageScreen', {image, ipDetails});
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>
          IP Tracker
        </Text>
        <View style={styles.searchBarContainer}>
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />
        </View>
      </View>
      <View style={styles.ipPanel}>
        <View style={styles.ipInfoContent}>
          <Text style={styles.title}>
            IP Address
          </Text>
          <Text style={styles.content}>
            162.158.102.248
          </Text>
        </View>
        <View style={styles.ipInfoContent}>
          <Text style={styles.title}>
            Location
          </Text>
          <Text style={styles.content}>
            162.158.102.248
          </Text>
        </View>
        <View style={styles.ipInfoContent}>
          <Text style={styles.title}>
            Timezone
          </Text>
          <Text style={styles.content}>
            UTC +01:00
          </Text>
        </View>
        <View style={styles.ipInfoContent}>
          <Text style={styles.title}>
            ISP
          </Text>
          <Text style={styles.content}>
            Cloudfare, Inc.
          </Text>
        </View>
      </View>
      <View style={styles.carouselContainer}>
      <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={false}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onSnapToItem={(index) => console.log('current index:', index)}
          renderItem={({ index }) => (
              <View
                  style={{
                      flex: 1,
                      borderWidth: 1,
                      justifyContent: 'center',
                  }}
              >
                  <Text style={{ textAlign: 'center', fontSize: 30 }}>
                      {index}
                  </Text>
              </View>
          )}
      />
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  inputContainer: {
    backgroundColor: 'blue',
    paddingVertical: 40,
    justifyContent: 'center'
  },
  inputLabel: {
    marginBottom: 20,
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  searchBarContainer:{
    justifyContent:'center',
    paddingHorizontal: 20,
    width: '100%'
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  content: {
    marginTop: 10,
    color:'gray',
    textAlign: 'center',
    fontSize: 12
  },
  carouselContainer: {
    flex: 1,
    paddingTop: 40
  }

})