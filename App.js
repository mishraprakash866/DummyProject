import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './src/navigation/BottomNavigator';
import Cart from './src/screens/Cart';
import ProductDetail from './src/screens/ProductDetail';

const Stack = createStackNavigator();

const App = () => {
  return <>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='BottomTabs' component={BottomNavigator} />
        <Stack.Screen name='Cart' component={Cart} />
        <Stack.Screen name='ProductDetail' component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  </>;
};

export default App;
