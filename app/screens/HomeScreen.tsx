import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import {fetchIPDetails} from '../services/IPService';
import SearchBar from '../components/SearchBar';
import Carousel from 'react-native-reanimated-carousel';
import { s1, s2, s3, s4, s5, s6 } from '../assets/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IPDetails } from '../Types';

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const images = [s1,s2,s3,s4,s5,s6];
const {width} = Dimensions.get('window');

const HomeScreen = (props: HomeScreenProps) => {
  const {navigation} = props;
  const [ip, setIp] = useState('');
  const [ipDetails, setIpDetails] = useState<IPDetails | null>(null);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    fetchIPDetails().then(data => setIpDetails(data));
  }, []);

  const handleIPSubmit = () => {
    fetchIPDetails(ip).then(data => setIpDetails(data));
  };

  const handleImageSelect = (image: ImageSourcePropType) => {
    navigation.navigate('Profile', {image, ipDetails});
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
          renderItem={({ index }) => (
              <View
                  style={{
                      flex: 1,                      
                      justifyContent: 'center',
                  }}
              >
                <TouchableOpacity onPress={()=>{handleImageSelect(images[index])}}>
                  <Image source={images[index]} style={{width:"100%", resizeMode:'stretch'}}/>
                </TouchableOpacity>
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
  carouselContainer: {
    flex: 1,
    paddingTop: 40
  }

})