import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchCity from './SearchCity'
import MeteoCity from './MeteoCity'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SearchCity}
          options={{ title: 'Accueil' }}
        />
        <Stack.Screen name="MeteoCity" component={MeteoCity} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
