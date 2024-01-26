import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ImageScreen from '../screens/ImageScreen';
import MarketScreen from '../screens/MarketScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function AppNavigator() {
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
