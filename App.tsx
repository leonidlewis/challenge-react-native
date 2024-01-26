import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen';
import ImageScreen from './app/screens/ImageScreen';
import MarketScreen from './app/screens/MarketScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import the icon set

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName='';

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account-circle' : 'account-circle';
            } else if (route.name === 'Market Data') {
              iconName = focused ? 'bar-chart' : 'bar-chart';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Dashboard" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ImageScreen} />
        <Tab.Screen name="Market Data" component={MarketScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
