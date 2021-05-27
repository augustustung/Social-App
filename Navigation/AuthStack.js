import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginScreen from '../screen/LoginScreen';
import OnBoardScreen from '../screen/OnBoardingScreen'
import SignupScreen from '../screen/SingupScreen'
import HomeScreen from '../screen/HomeScreen'

const Stack = createStackNavigator();

function AuthStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  let routeName

  useEffect(() => {
    AsyncStorage.getItem('alreadyLauched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLauched', 'true')
        setIsFirstLaunch(true)
      } else setIsFirstLaunch(false)
    })
  }, [])


  if(isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = "Board"
  } else {
    routeName = "Login"
  }
  return (
    (
      <Stack.Navigator initialRouteName={routeName} >
        <Stack.Screen name="Board" component={OnBoardScreen} options={{ header: () => null }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }} />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#f9fafd',
              shadowColor: '#f9fafd',
              elevation: 0
            },
            headerLeft: () => {
              return (
                <View />
              )
            }
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => null }} />
      </Stack.Navigator>
    )
  )
}

export default AuthStack