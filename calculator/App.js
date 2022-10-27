import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import calc from './components/Calc_screen.js'
import history from './components/history_screen.js'


const Stack = createStackNavigator ();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calc">
        <Stack.Screen name="Calc" component={calc} options={{headerShown: false}}/>
        <Stack.Screen name="History" component={history} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
