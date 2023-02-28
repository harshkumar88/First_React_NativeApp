import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from "./Src/Home"
import Movies from './Src/Movies';
import Tv from './Src/Tv';
import Nav from './Src/Nav';
import Details from './Src/Details';

export default function App() {
  return (
   
    <NavigationContainer>
    
    <Stack.Navigator>
        <Stack.Screen name="Movies" component={Movies} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="Tv" component={Tv} options={{
          headerShown:false
        }}/>

        <Stack.Screen name="Details" component={Details}/>
      </Stack.Navigator>
  </NavigationContainer>
  // <View>

  //     <Text style={{fontSize:'30px'}}>Hello</Text>
  //     <Text>hll</Text>
  // </View>
 
    
  );
}

