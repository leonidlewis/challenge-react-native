import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ImageScreen from '../screens/ImageScreen';
import MarketScreen from '../screens/MarketScreen';

export default function AppNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={ImageScreen} />
        <Tab.Screen name="Settings" component={MarketScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
