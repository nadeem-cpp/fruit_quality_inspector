import React, { useEffect } from 'react';

//Navigation
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'


//Screens
import Home from './screens/Home';
import Auth from './screens/Auth';
import Display from './screens/DisplayResult';
import SplashScreen from 'react-native-splash-screen'
import { Platform } from 'react-native';


export type RootStackParamList = {
  Home: {userId: string},
  Auth: undefined,
  Display: {uri: string | undefined, result: string, user: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>();


function App(): React.JSX.Element {
  useEffect(() => {
    if(Platform.OS === 'android')
      {
        SplashScreen.hide();
      }
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth'>
        <Stack.Screen name='Auth' component={Auth} options={{headerShown:false}}/>
        <Stack.Screen 
        name='Home'
        component={Home}
        options={{
          headerShown:false,
          // headerTransparent: true,
          // header:()=> {return <Header/>},
          headerTitleStyle:{color:"gray"},
          headerStyle: {backgroundColor:"#DEECF5"},
          
        }}
        />
        <Stack.Screen name='Display' component={Display} options={{headerShown:false}}/>
      </Stack.Navigator>

    </NavigationContainer>
    );
}


export default App;
